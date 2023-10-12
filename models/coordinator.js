


module.exports = (sequelize,DataTypes)=>{
    const Coordinator = sequelize.define("Coordinator",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        userId:DataTypes.STRING,
        firstname:DataTypes.STRING,
        middlename:DataTypes.STRING,
        lastname:DataTypes.STRING,
        gender:DataTypes.STRING,
        email:DataTypes.STRING,
        phone:DataTypes.STRING,
        password:DataTypes.STRING,
        imageUrl:DataTypes.STRING
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    Coordinator.associate = (models)=>{
        Coordinator.belongsTo(models.Department);
    }


    return Coordinator;
}