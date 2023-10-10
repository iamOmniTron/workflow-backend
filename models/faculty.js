



module.exports = (sequelize,DataTypes)=>{
    const Faculty = sequelize.define("Faculty",{
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

    Faculty.associate = (models)=>{
        Faculty.hasMany(models.Department);
    }

    return Faculty;
}