const express = require("express");
const router = express.Router();
const BattleController = require("../controllers/battle.controller");

router.get("/list", BattleController.getAll);
router.get("/count", BattleController.getCount);
router.get("/search", BattleController.search);
router.get("/stats", BattleController.stats);

module.exports = router;