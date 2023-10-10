




module.exports = (sequelize,DataTypes)=>{
    const Department = sequelize.define("Department",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:DataTypes.STRING,
        value:DataTypes.STRING
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    Department.associate = (models)=>{
        Department.belongsTo(models.Faculty);
        Department.hasMany(models.User);
        Department.hasOne(models.Coordinator)
        Department.hasMany(models.Memo)
    }

    return Department
}