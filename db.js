const mongoose = require("mongoose");
const BattleModel = require("./models/battle.model");
const config = require("./config/config");

// initialize database connection
mongoose.connect(
    config.mongoDbUrl,
    {
        useNewUrlParser: true,
        // fix for "collection.ensureIndex is deprecated"
        // see https://github.com/Automattic/mongoose/issues/6890#issuecomment-416410444
        useCreateIndex: true
    },
    err => {
        if (err) {
            console.error("Error connecting to mongo database");
            console.error(err);
        }
    }
);

module.exports = {
    "BattleModel": BattleModel(mongoose)
};
