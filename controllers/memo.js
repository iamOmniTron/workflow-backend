const db = require("../models");
const z = require("zod");
const { hashPassword } = require("../utilities/helpers");


const TypeSchema = {
    memoSchema: z.object({
        title:z.string().min(1,"Title is required"),
        subject:z.string().min(1,"Memo subject is required"),
        text:z.string().min(1,"Memo content is required")
    })
}


module.exports = {
    createMemo: async (req,res,next)=>{
        try {
            const body = TypeSchema.memoSchema.parse(req.body);
            const {userId} = req;
            const coordinator = await db.Coordinator.findOne({where:{id:userId}});
            const isCreated = await db.Memo.create({...body,DepartmentId:coordinator.DepartmentId});

            if(!isCreated) return res.json({
                success:false,
                message:"cannot create memo"
            });

            return res.json({
                success:true,
                message:"memo created successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    updateMemo: async(req,res,next)=>{
        try {
            const {memoId} = req.params;
            const body = TypeSchema.memoSchema.parse(req.body);
            const isupdated = await db.Memo.update({...body},{where:{id:memoId}});

            if(isupdated[0] < 1) return res.json({
                success:false,
                message:"cannot update memo"
            });


            return res.json({
                success:true,
                message:"memo updated successfully"
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllMemo: async (req,res,next)=>{
        try {
            const memos = await db.Memo.findAll({include:[{model:db.Department}]});
            return res.json({
                success:true,
                data:memos
            })
        } catch (error) {
            return next(error);
        }
    },

    deleteMemo: async (req,res,next)=>{
        try {
            const {memoId}= req.params;
            const isDeleted = await db.Memo.destroy({where:{id:memoId}});

            if(isDeleted < 1) return res.json({
                success:false,
                message:"Cannot delete memo"
            });

            return res.json({
                success:true,
                message:"memo deleted successfully"
            })
        } catch (error) {
            return next(error);
        }
    },

    getStudentMemos: async (req,res,next)=>{
        try {
            const {userId} = req;
            const user = await db.User.findOne({where:{id:userId}});

            const memos = await db.Memo.findAll({where:{DepartmentId:user.DepartmentId},include:[{model:db.Department}]});

            return res.json({
                success:true,
                data:memos
            })
        } catch (error) {
            return next(error);
        }
    },
    getCoordinatorMemo:async (req,res,next)=>{
        try {
            const {userId} = req;
            const user = await db.Coordinator.findOne({where:{id:userId}});

            const memos = await db.Memo.findAll({where:{DepartmentId:user.DepartmentId},include:[{model:db.Department}]});

            return res.json({
                success:true,
                data:memos
            })
        } catch (error) {
            return next(error);
        }
    },
}