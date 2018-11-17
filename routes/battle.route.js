const express = require("express");
const router = express.Router();
const BattleController = require("../controllers/battle.controller");

router.get("/list", BattleController.getAll);

module.exports = router;