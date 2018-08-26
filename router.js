const config = require("./config")(process.env.NODE_ENV)

module.exports = {
  "/": (req, res) => {
    res.writeHead(302, {
      "Location": `${config.hostname}/index.html`
    })
  }
}