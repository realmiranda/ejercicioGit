"use strict"
const mongoose = require("mongoose");
const app = require("./app");
const port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:aceleradigital@cluster0.jfokgq7.mongodb.net/course", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DataBase Connected successfully");

    const server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((err) => console.log(err));


