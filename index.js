const express = require("express");
const battleRouter = require("./routes/battle.route");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

// router rules
app.use("/v1/battle", battleRouter);

// custom error handlers
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        message: "Unexpected error occurred"
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));