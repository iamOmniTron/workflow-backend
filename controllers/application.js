const db = require("../models");
const z = require("zod");
const { STATUSES } = require("../utilities/defaults");

const TypeSchema = {
    applicationSchema:z.object({
        userId:z.number().min(1,"invalid user ID"),
    })
}




module.exports = {
    createApplication: async (req,res,next)=>{
        try {
            const {userId} = TypeSchema.applicationSchema.parse(req.body);
            const application = await db.Application.findOne({where:{UserId:userId}});
            if(application){
                if(application.status !== STATUSES.REJECTED) return res.json({
                    success:false,
                    message:"User application exists already"
                });
                await db.Application.destroy({where:{id:application.id}});
            }
            const isCreated = await db.Application.create({UserId:userId,status:STATUSES.PENDING});
            if(!isCreated) return res.json({
                success:false,
                message:"cannot proceed application"
            });

            return res.json({
                success:true,
                message:"user application successful"
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllApplications: async (req,res,next)=>{
        try {
            const applications = await db.Application.findAll({include:[{
                model:db.User,include:[{
                    model:db.Document
                },{model:db.Department}]
            }]});

            return res.json({
                success:true,
                data:applications
            })
        } catch (error) {
            return next(error);
        }
    },
    approveApplication: async (req,res,next)=>{
        try {
           const {applicationId} = req.params;
           const isUpdated = await db.Application.update({status:STATUSES.SUCCESSFUL},{where:{id:applicationId}});
           if(isUpdated[0] < 1) return res.json({
            success:false,
            message:"Cannot approve application right now"
           }) ;

           return res.json({
                success:true,
                message:"Application approved successfully"
           })
        } catch (error) {
            return next(error);
        }
    },
    rejectApplication:async (req,res,next)=>{
        try {
           const {applicationId} = req.params;
           const isUpdated = await db.Application.update({status:STATUSES.REJECTED},{where:{id:applicationId}});
           if(isUpdated[0] < 1) return res.json({
            success:false,
            message:"Cannot reject application right now"
           }) ;

           return res.json({
                success:true,
                message:"Application rejected successfully"
           })
        } catch (error) {
            return next(error);
        }
    },
    getDepartmentApplications: async (req,res,next)=>{
        try {
            const {userId} = req;
            const applications = await db.Application.findAll({
                include:[{
                    model:db.User,include:[{
                        model:db.Department,required:true,
                        include:[{
                            model:db.Coordinator,where:{id:userId}
                        }]
                    }]
                }]
            })

           return res.json({
                success:true,
                data:applications
           })
        } catch (error) {
            return next(error);
        }
    },
    getMyApplication: async (req,res,next)=>{
        try {
            const {userId} = req;
            const applications = await db.Application.findOne({
                include:[{
                    model:db.User,where:{id:userId}
                }]
            })

           return res.json({
                success:true,
                data:applications
           })
        } catch (error) {
            return next(error);
        }
    },
}