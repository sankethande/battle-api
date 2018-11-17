const { BattleModel } = require("../db");

function getAll(req, res) {
    console.log(req);
    console.log(res);
    testMongoDb();
    res.send({data: "TODO"});
}

function testMongoDb() {
    const instance = new BattleModel();
    instance.year = 1906;
    instance.battle_number = 2;
    instance.save(function (err) {
        console.log(err); 
    });
}

module.exports = {
    getAll
};