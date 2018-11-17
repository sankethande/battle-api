const express = require("express");
const bodyParser = require("body-parser");
const BattleRouter = require("./routes/battle.route");
const AuthRouter = require("./routes/auth.route");
const jwtMiddleware = require("./middlewares/jwt.middleware");
const { httpPort } = require("./config/config");
const path = require("path");
const app = express();

// let's have documentation at the root
app.use(express.static("doc"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

app.get("/docs", function(req, res) {
    res.sendFile(path.join(__dirname + "/doc/index.html"));
});

// router rules for auth
app.use("/v1/auth", AuthRouter);

// NOTE - we are using jwtMiddleware after auth
// this is to skip token checks for auth routes
app.use(jwtMiddleware);

// battle api routes
app.use("/v1/battle", BattleRouter);

// custom error handlers
// this will also catch async errors since we are usign express-async-errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        error: ["Unexpected error occurred"]
    });
});

app.listen(httpPort, () => console.log(`Battle API app listening on port ${httpPort}!`));