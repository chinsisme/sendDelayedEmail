const express = require("express");
const app = express();

const port = process.env.port || 2000;

const sendDelayedEmail = require("./routes/sendDelayedEmail")


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,x-auth-token"
    );
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});


// app.use(express.json());

app.listen(port, () => {
    console.log("Listening on port " + port);
});


app.use("/sendDelayedEmail", sendDelayedEmail)

// Test server connection

app.get("/", (req, res) => {
    res
        .send({
            MESSAGE: process.env.MESSAGE_SERVER_CONNECTION_SUCCESS,
            STATUS_CODE: process.env.STATUS_CODE_SERVER_CONNECTION_SUCCESS
        })
        .status(process.env.STATUS_CODE_SERVER_CONNECTION_SUCCESS);
});