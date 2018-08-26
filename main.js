const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const port = process.argv[2] || 8002;

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);

    let pathname = `.${parsedUrl.pathname}`;

    const contentTypes = {
      ".ico": "image/x-icon",
      ".html": "text/html",
      ".js": "text/javascript",
      ".json": "application/json",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".wav": "audio/wav",
      ".mp3": "audio/mpeg",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
      ".doc": "application/msword"
    };

    let isExist = fs.existsSync(pathname);

    if (!isExist) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found`);
    } else {
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}`);
        } else {
          let ext = path.parse(pathname).ext;
          res.setHeader("Content-type", contentTypes[ext] || "text/plain");
          res.end(data);
        }
      });
    }
  })
  .listen(port);

console.log(`server listening at port ${port}`);


// setting CORS headers
/*
  // Website you wish to allow to connect
  response.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.setHeader('Access-Control-Allow-Credentials', true);
*/
