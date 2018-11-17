const prodConfig = require("./config.prod");

const defaultConfig = {
    mongoDbUrl: "mongodb://localhost/my_database"
};

module.exports = {
    ...defaultConfig,
    ...prodConfig
};