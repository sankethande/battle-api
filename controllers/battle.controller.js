const { BattleModel } = require("../db");

async function getAll(req, res) {
    // if skip in query string use it else default to 0
    const skip = +req.query.skip ? +req.query.skip : 0;

    // if limit in query string then use it else default to 10
    const limit = +req.query.limit ? +req.query.limit : 10;

    // fetch from database
    const allBattles = await BattleModel
        .find({})
        .skip(skip)
        .limit(limit)
        .exec();
    
    // send response
    res.send({
        data: {
            battles: allBattles
        }
    });
}

async function getCount(req, res) {
    // fetch count from database
    const count = await BattleModel.count({}).exec();
    
    // send response
    res.send({
        data: {
            count
        }
    });
}

/**
 * Function for testing MongoDb write permission
 */
/*
function testMongoDb() {
    const instance = new BattleModel();
    instance.year = 1906;
    instance.battle_number = 2;
    instance.save(function (err) {
        console.log(err); 
    });
}
*/

module.exports = {
    getAll,
    getCount
};