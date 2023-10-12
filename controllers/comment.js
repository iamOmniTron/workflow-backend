const db = require("../models");
const z = require("zod");


const TypeSchema = {
    commentSchema : z.object({
        text:z.string().min(1,'content is required'),
        documentId:z.string().min(1,"invalid document")
    })
};



module.exports = {
    createComment: async (req,res,next)=>{
        try {
            const {documentId,...rest} = TypeSchema.commentSchema.parse(req.body);
            const isCreated = await db.Comment.create({...rest,DocumentId:documentId});
            if(!isCreated) return res.json({
                sucess:false,
                message:"Cannot create comment"
            });

            return res.json({
                    success:true,
                    message:"comment added successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllDocumentComments: async (req,res,next)=>{
        try {
            const {documentId} = req.params;
            const comments = await db.Comment.findAll({where:{DocumentId:documentId}});
            return res.json({
                success:true,
                data:comments
            })
        } catch (error) {
            return next(error)
        }
    },
    getAllStudentComments: async (req,res,next)=>{
        try {
            const {studentId} = req.params;
            const comments = await db.Comment.findAll({
                include:[{model:db.Document,where:{UserId:studentId},include:[{
                    model:db.DocumentType
                }]}]
            });
            return res.json({
                success:true,
                data:comments
            })
        } catch (error) {
            return next(error);
        }
    },
    updateComment: async (req,res,next)=>{
        try {
            const {commentId} = req.params;
            const {documentId,...rest} = TypeSchema.commentSchema.parse(req.body)
            const isUpdated = await db.Comment.update({...rest,DocumentId:documentId},{where:{id:commentId}});
            if(isUpdated[0] <1) return res.json({
                success:false,
                message:"cannot update comment"
            });
            return res.json({
                success:true,
                message:"comment updated successfully"
            })
        } catch (error) {
            return next(error)
        }
    },
    deleteComment:async(req,res,next)=>{
        try {
            const {commentId} = req.params;
            const isDeleted = await db.Comment.destroy({where:{id:commentId}});
            if(isDeleted < 1) return res.json({
                success:false,
                message:"cannot delete comment"
            });

            return res.json({
                success:true,
                message:"comment deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    }
}