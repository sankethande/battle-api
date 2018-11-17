const express = require("express");
const battleRouter = require("./routes/battle.route");
const app = express();
const port = 3000;

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => res.send("Hello World!"));

// router rules
app.use("/v1/battle", battleRouter);

// custom error handlers
// this will also catch async errors since we are usign express-async-errors
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        message: "Unexpected error occurred"
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));