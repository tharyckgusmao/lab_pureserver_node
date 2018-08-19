let http = require("http");
let https = require("https");
let config = require("./app/config/config");
let logicServer = require("./app/server/logicServer");
let _data = require("./lib/data");
let fs = require("fs");





//create Data
// @TODO Delete this
_data.delete('test','new',(err)=>{
    console.log(err);
})



//http
let httpServer = http.createServer((req, res) => {
  logicServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log("Server STARTUP - PORT  " + config.httpPort);
});

//https
let httpsConfig = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem")
};

let httpsServer = https.createServer(httpsConfig, (req, res) => {
  logicServer(req, res);
});

httpsServer.listen(config.httpsPort, () => {
  console.log("Server STARTUP - PORT  " + config.httpsPort);
});
