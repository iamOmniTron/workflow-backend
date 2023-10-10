






module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define("Comment",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        text:DataTypes.TEXT,
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    Comment.associate = (models)=>{
        Comment.belongsTo(models.Document)
    }


    return Comment;
}
