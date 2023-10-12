const db = require("../models");
const z = require("zod");
const  path = require("path");
const { hashPassword } = require("../utilities/helpers");


const TypeSchema = {
    userSchema: z.object({
        matricNumber:z.string().min(1,"Invalid Matric Number"),
        firstname:z.string().min(1,"invalid firstname"),
        lastname:z.string().min(1,"invalid lastname"),
        middlename:z.string().min(1,"invalid middlename"),
        phone:z.string().min(1,"phone number is requird"),
        email:z.string(0).min(1,"invalid email"),
        gender:z.string().min(1,"Invalid grender"),
    })
}


module.exports = {
    createStudent: async (req,res,next)=>{
        const {userId} = req;
        try {
            const body = TypeSchema.userSchema.parse(req.body);
            const coordinator = await db.Coordinator.findOne({where:{id:userId}})
            if(!coordinator) return res.json({
                success:false,
                message:"Unauthorized"
            })
            const password = await hashPassword("12345678");
            const isCreated = await db.User.create({...body,password,DepartmentId:coordinator.DepartmentId});

            if(!isCreated) return res.json({
                success:false,
                message:"cannot save user"
            });

            return res.json({
                success:true,
                message:"User saved successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    updateUser: async(req,res,next)=>{
        try {
            const {userId} = req.params;
            const body = TypeSchema.userSchema.parse(req.body);
            const isupdated = await db.User.update({...body},{where:{id:userId}});

            if(isupdated[0] < 1) return res.json({
                success:false,
                message:"cannot update user"
            });


            return res.json({
                success:true,
                message:"user updated successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllUser: async (req,res,next)=>{
        try {
            const users = await db.User.findAll({
                include:[{
                    model:db.Department
                },{model:db.Document,include:[{model:db.DocumentType}]},
                {model:db.Application}]
            });
            return res.json({
                success:true,
                data:users
            })
        } catch (error) {
            return next(error);
        }
    },
    getDepartmentalUser: async (req,res,next)=>{
        try {
            const {userId} = req;
            const users = await db.User.findAll({
                include:[{model:db.Department,required:true,include:[{
                    model:db.Coordinator,where:{id:userId}
                }]},{model:db.Document,include:[{model:db.DocumentType}]},
                {model:db.Application}
            ]
            });
            return res.json({
                success:true,
                data:users
            })
        } catch (error) {
            return next(error);
        }
    },

    deleteUser: async (req,res,next)=>{
        try {
            const {userId}= req.params;
            const isDeleted = await db.User.destroy({where:{id:userId}});

            if(isDeleted < 1) return res.json({
                success:false,
                message:"Cannot delete student"
            });

            return res.json({
                success:true,
                message:"student deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    searchByMatric: async (req,res,next)=>{
        try {
            const {matricNumber} = req.params;
            const user = await db.User.findOne({where:{matricNumber},include:[{model:db.Department}]});

            return res.json({
                success:true,
                data:user
            })
        } catch (error) {
            return next(error);
        }
    },
    uploadStudentImage: async(req,res,next)=>{
        try {
            const {userId} = req;
            const file = req.file;
            const imageUrl = file.path.replace(/\\/g, "/").substring(7);
            const isUpdated = await db.User.update({imageUrl},{where:{id:userId}});

            if(!isUpdated) return res.json({
                success:false,
                message:"Cannot update profile image"
            });

            return res.json({
                success:true,
                message:"profile image updated successfully"
            })
        } catch (error) {
            return next(error);
        }
    }
    
}