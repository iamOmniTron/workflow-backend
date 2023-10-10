


module.exports = (sequelize,DataTypes)=>{
    const Admin = sequelize.define("Admin",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        userId:DataTypes.STRING,
        role:DataTypes.INTEGER,
        isSuper:DataTypes.BOOLEAN,
        email:DataTypes.STRING,
        phone:DataTypes.STRING,
        password:DataTypes.STRING
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    return Admin;
}