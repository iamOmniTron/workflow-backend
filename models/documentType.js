




module.exports = (sequelize,DataTypes)=>{
    const DocumentType = sequelize.define("DocumentType",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title:DataTypes.STRING,
        value:DataTypes.STRING,
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    DocumentType.associate = (models)=>{
        DocumentType.hasMany(models.Document);
    }

    return DocumentType;
}