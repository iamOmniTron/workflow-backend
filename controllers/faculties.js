const db = require("../models");
const z = require("zod");



const TypeSchema = {
    facultySchema: z.object({
        title:z.string().min(1,"Faculty name is required"),
        value:z.string().min(1,"value is requirer")
    })
}




module.exports = {
    createFaculty: async (req,res,next)=>{
        try {     
            const {title,value} = TypeSchema.facultySchema.parse(req.body);
            const isCreated = await db.Faculty.create({title,value});
            if(!isCreated) return res.json({
                success:false,
                message:"Cannot create faculty"
            });
    
            return res.json({
                success:true,
                message:"faculty created sucessfully"
            })
        } catch (error) {
            return next(error)
        }
    },  
    updateFaculty: async (req,res,next)=>{
        try {
            const {facultyId} = req.params;
            const body = TypeSchema.facultySchema.parse(req.body);
            const isUpdated = await db.Faculty.update({...body},{where:{id:facultyId}});
            if(!isUpdated) return res.json({
                success:false,
                message:"Cannot update faculty"
            });

            return res.json({
                success:true,
                message:'faculty updated successfully'
            })
        } catch (error) {
            return next(error);
        }
    },
    getFaculties: async (req,res,next)=>{
        try {
            const faculties = await db.Faculty.findAll();

            return res.json({
                success:true,
                data:faculties
            })
        } catch (error) {
            return next(error);
        }
    },
    deleteFaculties: async (req,res,next)=>{
        try {
            const {facultyId} = req.params;
            const isDeleted = await db.Faculty.destroy({where:{id:facultyId}});

            if(isDeleted < 1) return res.json(
                {success:false,
                message:"cannot delete department"
            });

            return res.json({
                success:true,
                message:"Faculty deleted successfuylly"
            })
        } catch (error) {
            return next(error);
        }
    }
}