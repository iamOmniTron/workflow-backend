const http = require("http");
const app = require("./app");
const PORT = 8080;


http.createServer(app).listen(PORT,()=>console.log(`Server up and running on port ${PORT}`));