




module.exports = (sequelize,DataTypes)=>{
    const Memo = sequelize.define("Memo",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:DataTypes.STRING,
        subject:DataTypes.STRING,
        text:DataTypes.TEXT
    },{
        sequelize,freezeTableName:true,timestamps:true
    });

    Memo.associate = (models)=>{
        Memo.belongsTo(models.Department)
    }


    return Memo;
}