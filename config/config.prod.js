/**
 * This is for production use
 * Whatever values you provide here will override the default in ./config.js
 * So for examply mongoDbUrl for production database will go here
 */
module.exports = {
    mongoDbUrl: process.env.mongoDbUrl || "mongodb://<user>:<pass>@<ulr>:<port>/<database>",
    httpPort: process.env.PORT || 3000
};
