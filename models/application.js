
// STATUSES are pending, rejected and successful

module.exports = (sequelize,DataTypes)=>{
    const Application = sequelize.define("Application",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        status:DataTypes.STRING,
        isSubmitted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize,freezeTableName:true,timestamps:true
    });


    Application.associate = (models)=>{
        Application.belongsTo(models.User);
    }


    return Application;
}