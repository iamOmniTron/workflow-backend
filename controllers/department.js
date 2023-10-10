const db = require("../models");
const z = require("zod");



const TypeSchema = {
    departmentSchema: z.object({
        title:z.string().min(1,"Department name is required"),
        value:z.string().min(1,"value is requirer"),
        facultyId:z.string().min(1,"Faculty is required")
    })
}




module.exports = {
    createDepartment: async (req,res,next)=>{
        try {     
            const {title,value,facultyId} = TypeSchema.departmentSchema.parse(req.body);
            const isCreated = await db.Department.create({title,value,FacultyId:facultyId});
            if(!isCreated) return res.json({
                success:false,
                message:"Cannot create department"
            });
    
            return res.json({
                success:true,
                message:"department created sucessfully"
            })
        } catch (error) {
            return next(error)
        }
    },  
    updateDepartment: async (req,res,next)=>{
        try {
            const {departmentId} = req.params;
            const body = TypeSchema.departmentSchema.parse(req.body);
            const isUpdated = await db.Department.update({...body},{where:{id:departmentId}});
            if(!isUpdated) return res.json({
                success:false,
                message:"Cannot update department"
            });

            return res.json({
                success:true,
                message:'department updated successfully'
            })
        } catch (error) {
            return next(error);
        }
    },
    getDepartments: async (req,res,next)=>{
        try {
            const departments = await db.Department.findAll({include:[{model:db.Faculty}]});

            return res.json({
                success:true,
                data:departments
            })
        } catch (error) {
            return next(error);
        }
    },
    deleteDepartments: async (req,res,next)=>{
        try {
            const {departmentId} = req.params;
            const isDeleted = await db.Department.destroy({where:{id:departmentId}});
            if(isDeleted < 1) return res.json({
                success:false,
                message:"Cannot delete "
            });
            return res.json({
                success:true,
                message:"departments deleted successufully"
            })
        } catch (error) {
            return next(error);
        }
    }
}