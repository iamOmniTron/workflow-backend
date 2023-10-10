const db = require("../models");
const z = require("zod");
const { isPassMatch, assignToken } = require("../utilities/helpers");
const { PRIORITIES } = require("../utilities/defaults");



const TypeSchema = {
    loginSchema: z.object({
        matricNumber:z.string().min(4,"Matric number is required"),
        password:z.string().min(1,"Invalid password")
    }),
    adminLoginSchema: z.object({
        userId:z.string().min(1,"Invalid User ID"),
        password: z.string().min(1,"Invalid password")
    })
}






module.exports = {

    loginUser: async(req,res,next)=>{
        try {
            const {matricNumber,password} = TypeSchema.loginSchema.parse(req.body);
            const user = await db.User.findOne({where:{matricNumber}});
            if(!user){
                return res.json({
                    success:false,
                    message:"Invalid Matric number/Password"
                })
            }
            const isMatched = isPassMatch(user.password,password);

            if(!isMatched) return res.json({
                success:false,
                message:"Invalid Matric Number/Password"
            });


            const payload = {
                userId:user.id,
                role:"user",
                priority:PRIORITIES.STUDENT,
            }

            const token = assignToken(payload);

            return res.json({
                success:true,
                data:token
            })
        } catch (error) {
            return next(error);
        }
    },
    loginDepartmentalCoordinator: async (req,res,next)=>{
        try {
            const {userId,password} = TypeSchema.adminLoginSchema.parse(req.body);
            const user = await db.Coordinator.findOne({where:{userId}});
            if(!user) return res.json({
                success:false,
                message:"Invalid User ID/password"
            });
            const isMatched = await isPassMatch(user.password,password);
            if(!isMatched) return res.json({
                success:false,
                message:"Invalid User ID/password"
            });

            const payload = {
                userId:user.id,
                role:"coordinator",
                priority:PRIORITIES.COORDINATOR
            }
            const token = assignToken(payload);

            return res.json({
                success:true,
                data:token
            })
        } catch (error) {
            return res.json(error);
        }
    },

    loginPGAdmin: async(req,res,next)=>{
        try {
            const {userId,password} = TypeSchema.adminLoginSchema.parse(req.body);
            let user = await db.Admin.findOne({where:{userId}});
            if(!user) return res.json({
                success:false,
                message:"Invalid User ID/password"
            });
            const isMatched = await isPassMatch(user.password,password);
            if(!isMatched) return res.json({
                success:false,
                message:"Invalid User ID/password"
            });
            const isSuperAdmin = user.isSuper;
            const payload ={
                userId:user.id,
                role: isSuperAdmin?"super":"pg",
                priority:isSuperAdmin?PRIORITIES.SUPER_ADMIN:PRIORITIES.PG_ADMIN
            };

            const token = assignToken(payload);

            return res.json({
                success:true,
                data:token
            })
        } catch (error) {
            return next(error);
        }
    },
    profile: async(req,res,next)=>{
        try {
            const {userId,role} = req;
            const roles = ["user","coordinator","pg","super"]
            if(!role || !roles.includes(role)){
                return res.json({
                    success:false,
                    message:"Unauthenticated"
                })
            }
            if(role === "user") {
                const user = await db.User.findOne({where:{id:userId},include:[{
                    model:db.Department
                }]});
                return res.json({
                    success:true,
                    data:user
                })
            }
            if(role === "coordinator") {
                const user = await db.Coordinator.findOne({where:{id:userId},include:[{
                    model:db.Department
                }]});
                return res.json({
                    success:true,
                    data:user
                })
            }

            const user = await db.Admin.findOne({where:{id:userId}});
            return res.json({
                success:true,
                data:user
            })
        } catch (error) {
            return next(error);
        }
    }
}