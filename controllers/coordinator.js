const db = require("../models");
const z = require("zod");
const  path = require("path");
const { hashPassword } = require("../utilities/helpers");



const TypeSchema = {
    coordinatorSchema: z.object({
        userId:z.string().min(1,"Invalid User ID"),
        firstname:z.string().min(1,"invalid firstname"),
        lastname:z.string().min(1,"invalid lastname"),
        middlename:z.string().min(1,"invalid middlename"),
        phone:z.string().min(1,"phone number is requird"),
        email:z.string().min(1,"invalid email"),
        gender:z.string().min(1,"Invalid grender"),
        departmentId:z.string().min(1,"department is required")
    })
}




module.exports = {
    createCoordinator: async (req,res,next)=>{
        try {     
            const {departmentId,...body} = TypeSchema.coordinatorSchema.parse(req.body);
            const password =  await hashPassword("12345678")
            const isCreated = await db.Coordinator.create({...body,password,DepartmentId:departmentId});
            if(!isCreated) return res.json({
                success:false,
                message:"Cannot create coordinator"
            });
    
            return res.json({
                success:true,
                message:"coordinator created sucessfully"
            })
        } catch (error) {
            return next(error)
        }
    },  
    updateCoordinator: async (req,res,next)=>{
        try {
            const {coordinatorId} = req.params;
            const {departmentId,...body} = TypeSchema.coordinatorSchema.parse(req.body);
            const isUpdated = await db.Coordinator.update({...body,DepartmentId:departmentId},{where:{id:coordinatorId}});
            if(!isUpdated) return res.json({
                success:false,
                message:"Cannot update coordinator"
            });

            return res.json({
                success:true,
                message:'coordinatoor updated successfully'
            })
        } catch (error) {
            return next(error);
        }
    },
        getCoordinators: async (req,res,next)=>{
        try {
            const coordinators = await db.Coordinator.findAll({
                include:[{
                    model:db.Department
                }]
            });

            return res.json({
                success:true,
                data:coordinators
            })
        } catch (error) {
            return next(error);
        }
    },
    deleteCoordinator: async (req,res,next)=>{
        try {
            const {coordinatorId} = req.params;
            const isDeleted = await db.Coordinator.destroy({where:{id:coordinatorId}});
            if(isDeleted < 1) return res.json({
                success:false,
                message:"Cannot delete coordinator"
            });

            return res.json({
                success:true,
                message:"coordinator deleted successfully"
            })
        }  catch (error) {
            return next(error);
        }
    },
    uploadCoordinatorImage: async(req,res,next)=>{
        try {
            const {userId} = req;
            const file = req.file;
            const imageUrl = file.path.replace(/\\/g, "/").substring(7);
            const isUpdated = await db.Coordinator.update({imageUrl},{where:{id:userId}});

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