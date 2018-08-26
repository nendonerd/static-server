const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");
const router = require("./router");
// const port = process.argv[2] || 8002;
const config = require("./config")(process.env.NODE_ENV);

const routing = (pathname, req, res) => {
  if (router[pathname]) {
    router[pathname](req, res);
    return true;
  } else {
    return false;
  }
};

const server = (req, res) => {
  const parsedUrl = url.parse(req.url);

  let pathname = parsedUrl.pathname;

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

  let isExist = fs.existsSync(`.${pathname}`);

  if (!routing(pathname, req, res) && !isExist) {
    res.statusCode = 404;
    res.end(`File ${pathname} not found`);
  } else {
    console.log(pathname)
    fs.readFile(`.${pathname}`, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}`);
      } else {
        let ext = path.parse(`.${pathname}`).ext;
        res.setHeader("Content-type", contentTypes[ext] || "text/plain");
        res.end(data);
      }
    });
  }
};


http.createServer(server).listen(config.httpPort);

console.log(`http server listening at port ${config.httpPort}`);


if (config.httpsPort) {
  const serverOpts = {
    cert: fs.readFileSync("/etc/letsencrypt/live/nendo.ml/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/nendo.ml/privkey.pem")
  };

  https.createServer(serverOpts, server).listen(config.httpsPort);

  console.log(`https server listening at port ${config.httpsPort}`);
}
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
