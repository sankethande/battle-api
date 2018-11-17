const prodConfig = require("./config.prod");

const defaultConfig = {
    mongoDbUrl: "mongodb://localhost/my_database",
    JWTKey: "NL(K(]`R6u%_hSg",
    httpPort: 3000
};

module.exports = {
    ...defaultConfig,
    ...prodConfig
};