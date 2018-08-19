let url = require("url");
let StringDecoder = require("string_decoder").StringDecoder;
let route = require("../routes/routes");
let logicServer = (req, res) => {
  //Get URL
  let parsedUrl = url.parse(req.url, true);

  // Get Path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //get query
  let queryStringObject = parsedUrl.query;

  // get method
  let method = req.method.toLowerCase();

  // get headers
  let headers = req.headers;

  // get payload stream
  let decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", data => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();
    
    //check route handle
    let choseHandler =
      typeof route[trimmedPath] !== "undefined"
        ? route[trimmedPath]
        : route['notForund'];

    let data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    choseHandler(data, (statusCode, payload) => {
      //Use the status
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      //Use the payload called back
      payload = typeof payload == "object" ? payload : {};

      //convert payload to a string
      let payloadString = JSON.stringify(payload);

      //Return the response
      // Send response
      res.setHeader("Content-Type", "aplication/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = logicServer;
