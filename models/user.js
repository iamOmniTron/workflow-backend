

module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        firstname:DataTypes.STRING,
        middlename:DataTypes.STRING,
        lastname:DataTypes.STRING,
        gender:DataTypes.STRING,
        email:DataTypes.STRING,
        matricNumber:DataTypes.STRING,
        phone:DataTypes.STRING,
        registerationDate:DataTypes.DATEONLY,
        password:DataTypes.STRING
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    User.associate = (models)=>{
        User.belongsTo(models.Department);
        User.hasOne(models.Application);
        User.hasMany(models.Document);
    }


    return User;
}