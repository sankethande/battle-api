const { BattleModel } = require("../db");

/**
 * @api {get} /v1/battle/list Get all battle list
 * @apiGroup Battle
 * @apiName GetAllBattles
 *
 * @apiHeader {String} token JWT token geneated from /login
 *
 * @apiParam {Number} skip Offset useful for pagination
 * @apiParam {Number} limit No of entries to fetch
 */
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

/**
 * @api {get} /v1/battle/count Get total number of battles
 * @apiGroup Battle
 * @apiName GetBattlesCount
 *
 * @apiHeader {String} token JWT token geneated from /login
 */
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
 * @api {get} /v1/battle/search Search battles
 * @apiGroup Battle
 * @apiName SearchBattles
 *
 * @apiHeader {String} token JWT token geneated from /login
 *
 * @apiParam {String} king Attacker or Defender king to search for
 * @apiParam {String} location Location where battle was fought
 * @apiParam {String} type Battle type
 */
async function search(req, res) {
    // start with empty search array
    // we will fill this as we encouter appropriate query params
    const searchObj = [];
    
    // search for king; attacker_king Or defender_king
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
                error: ["Nothing to search"]
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
 * Get distinct values with count for given column/key
 */
function getGroupCountPromise(col) {
    return BattleModel
        .aggregate([
            {
                $group: {
                    _id: `$${col}`,
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    "count": -1
                }
            }
        ])
        .exec();
}

/**
 * min, max and avg for defender size
 */
function getDefenderStatsPromise() {
    return BattleModel
        .aggregate([
            {
                $match: {
                    defender_size: {
                        $gte: 0
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    max: {
                        $max: "$defender_size"
                    },
                    min: {
                        $min: "$defender_size"
                    },
                    avg: {
                        $avg: "$defender_size"
                    }
                }
            },
            {
                $project: {
                    max: 1,
                    min: 1,
                    avg: 1,
                    _id: 0
                }
            }
        ])
        .exec();
}

/**
 * @api {get} /v1/battle/stats Statistics of all battles
 * @apiGroup Battle
 * @apiName BattleStats
 *
 * @apiHeader {String} token JWT token geneated from /login
 */
async function stats(req, res) {
    const fetchGroupCountList = [
        "attacker_king",
        "defender_king",
        "region",
        "name",
        "attacker_outcome",
        "battle_type"
    ];    
    
    // we'll pushing results to this
    const groupCounts = {};
    
    // To find the most active we group that key
    // get count of each group
    // sort by count descending
    const groupCountPromiseArray = [];
    for (let col of fetchGroupCountList) {
        groupCountPromiseArray.push(getGroupCountPromise(col));
    }
    (await Promise.all(groupCountPromiseArray)).map((result, index) => {
        groupCounts[fetchGroupCountList[index]] = result;
    });
    
    
    const mostActive = {};
    for (let col of ["attacker_king", "defender_king", "region", "name"]) {
        mostActive[col] = groupCounts[col][0]._id;
    }
    
    const attackerOutcome = {};
    for (let row of groupCounts.attacker_outcome) {
        if (row._id) {
            attackerOutcome[row._id] = row.count;
        }
    }
    
    const battleType = [];
    for (let row of groupCounts.battle_type) {
        if (row._id) {
            battleType.push(row._id);
        }
    }
    
    // get min, max and avg for defender size
    const defenderSizeStats = await getDefenderStatsPromise();
    
    // send response
    res.send({
        data: {
            most_active: mostActive,
            attacker_outcome: attackerOutcome,
            battle_type: battleType,
            defender_size: defenderSizeStats
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
    search,
    stats
};