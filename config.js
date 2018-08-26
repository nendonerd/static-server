module.exports = env => {
  switch(env) {
    case "production":
      return {
        hostname: "https://nendo.ml",
        httpPort: 80,
        httpsPort: 443,

      }
      break;
    default:
      return {
        hostname: "http://localhost:8004",
        httpPort: 8004
      }
  }
}