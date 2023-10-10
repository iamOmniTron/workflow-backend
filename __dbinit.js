const db = require("./models");
const { ROLES } = require("./utilities/defaults");
const { hashPassword } = require("./utilities/helpers");



const CreatePG_ADMIN = async()=>{
    const t = await db.sequelize.transaction();
    const pass = await hashPassword("12345678");
    try {
        const isCreated = await db.Admin.create({
            userId:"pg_admin",
            password:pass,
            email:"spgs@nsuk.edu.ng",
            isSuper:false,
            phone:"08167522344",
            role:2
        },{transaction:t});
        if(!isCreated) throw new Error("error initializing data");

        await t.commit();
    } catch (error) {
        await t.rollback();
        throw new Error(error)
    }
}



module.exports = async ()=>{
    try {
        console.log("Connecting to database...");
        await db.sequelize.authenticate();
        console.log("DB Connection established successfully,synchronizing Database...");
        await db.sequelize.sync(
            // {force:true}
            );
        await CreatePG_ADMIN();
        console.log("Database synchronized successfully");
    } catch (error) {
        throw new Error(error);
    }

}