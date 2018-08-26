module.exports = env => {
  switch(env) {
    case "production":
      return {
        httpPort: 80,
        httpsPort: 443
      }
      break;
    default:
      return {
        httpPort: 8004,
        httpsPort: 8005
      }
  }
}