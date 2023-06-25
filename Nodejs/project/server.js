"use strict"
const mongoose = require("mongoose");
const app = require("./app");
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb:write:your:URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DataBase Connected successfully");

    const server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((err) => console.log(err));


