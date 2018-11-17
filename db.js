const mongoose = require("mongoose");
const BattleModel = require("./models/battle.model");

// initialize database connection
mongoose.connect('mongodb://localhost/my_database');

module.exports = {
    "BattleModel": BattleModel(mongoose)
};