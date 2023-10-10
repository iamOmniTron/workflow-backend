const db = require("../models");
const z = require("zod");


const TypeSchema= {
    documentSchema:z.object({
        typeId:z.string().min(1,"document type is required"),
        userId:z.string().min(1,"user ID is required"),
    })
}




module.exports = {
    createDocument: async (req,res,next)=>{
        try {
            const {typeId,userId} =TypeSchema.documentSchema.parse(req.body);
            const file = req.file;
            const imageUrl = file.path.replace(/\\/g, "/").substring(7);
            const isCreated = await db.Document.create({DocumentTypeId:typeId,UserId:userId,imageUrl});
            if(!isCreated) return res.json({
                success:false,
                message:"cannot create document"
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllDocument: async (req,res,next)=>{
        try {
            const documents = await db.Document.findAll({include:[{model:db.User},{model:db.DocumentType}]});
            return res.json({
                success:true,
                data:documents
            })
        } catch (error) {
            return next(error);
        }
    },
    getDepartmentalDocuments: async (req,res,next)=>{
        try {
            const {userId} = req;
            const documents = await db.Document.findAll({include:[
                {model:db.User,include:[{
                    model:db.Department,include:[{
                        model:db.Coordinator,where:{
                            id:userId
                        },required:true
                    }]
                }]},{model:db.DocumentType}
            ]});
            return res.json({
                success:true,
                data:documents
            })
        } catch (error) {
            return next(error);
        }
    },
    deleteDocument: async (req,res,next)=>{
        try {
            const {documentId} = req.params;
            const isDeleted = await db.Document.destroy({where:{id:documentId}});
            if(isDeleted < 1) return res.json({
                success:false,
                message:"Failed to delete document"
            });

            return res.json({
                success:true,
                message:"document deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    }
}