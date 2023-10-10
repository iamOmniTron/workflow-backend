

module.exports = (sequelize,DataTypes)=>{
    const Document = sequelize.define("Document",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        imageUrl:DataTypes.STRING,
    },{
        sequelize,freezeTableName:true,timestamps:true
    });


    Document.associate = (models)=>{
        Document.belongsTo(models.DocumentType);
        Document.hasMany(models.Comment)
        Document.belongsTo(models.User);
    }


    return Document;
}