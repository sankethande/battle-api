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

async function search(req, res) {
    // start with empty search array
    // we will fill this as we encouter appropriate query params
    const searchObj = [];
    
    // search for king
    if (req.query.king) {
        searchObj.push({
            $or: [
                {attacker_king: new RegExp(req.query.king)},
                {defender_king: new RegExp(req.query.king)}
            ]
        });
    }
    
    // search for location
    if (req.query.location) {
        searchObj.push({
            location: new RegExp(req.query.location)
        });
    }
    
    // search for type
    if (req.query.type) {
        searchObj.push({
            battle_type: new RegExp(req.query.type)
        });
    }
    
    // if nothing provided to search then throw 400
    if (searchObj.length === 0) {
        return res
            .status(400)
            .send({
                error: "Nothing to search"
            });
    }
    
    // fetch count from database
    const allBattles = await BattleModel.find().and(searchObj).exec();
    
    // send response
    res.send({
        data: {
            battles: allBattles
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
    getCount,
    search
};