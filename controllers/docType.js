const db = require("../models");
const z = require("zod");


const TypeSchema = {
    Type:z.object({
        title:z.string().min(1,"Title field is required"),
        value:z.string().min(1,"value field is required")
    })
};



module.exports = {
    createDocumentType: async (req,res,next)=>{
        try {
            const body = TypeSchema.Type.parse(req.body);
            const isCreated = await db.DocumentType.create({...body});

            if(!isCreated) return res.json({
                success:false,
                message:"cannot create document type"
            });

            return res.json({
                success:true,
                message:"document type created successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    updateDocumentType: async (req,res,next)=>{
        try {
            const {typeId} = req.params;
            const body = TypeSchema.Type.parse(req.body);

            const isUpdated = await db.DocumentType.update({...body},{where:{id:typeId}});

            if(isUpdated[0] < 1) return res.json({
                success:false,
                message:"cannot update document type"
            });

            return res.json({
                success:true,
                message:"Update successful"
            })
        } catch (error) {
            return next(error);
        }
    },
    deleteDocumentType: async (req,res,next)=>{
        try {
            const {typeId} = req.params;

            const isDeleted = await db.DocumentType.destroy({where:{id:typeId}});


            if(isDeleted < 0) return res.json({
                success:false,
                message:"cannot delete this config"
            });


            return res.json({
                success:true,
                message:"config deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    getDocumentTypes:async (req,res,next)=>{
        try {
            const types = await db.DocumentType.findAll();

            return res.json({
                success:true,
                data:types
            })
        } catch (error) {
            return next(error);
        }
    }
}