const {hash,compare} = require("bcrypt");
const {sign,verify} = require("jsonwebtoken");
const multer = require("multer");
const path = require("path")

const storage =  multer.diskStorage({
    destination: function (_, __, cb) {
      cb(null, "./public/documents")
    },
    filename: function (_, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })




module.exports ={
    hashPassword : async (password)=> await hash(password,10),
    isPassMatch: async (encrypted,plain)=> await compare(plain,encrypted),
    assignToken: (payload)=> sign(payload,process.env.SECRET_KEY,{expiresIn:"2d"}),
    decodeToken: (token)=>verify(token,process.env.SECRET_KEY),
    upload:multer({storage})
}