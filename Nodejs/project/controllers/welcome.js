"use strict"

var controller = {
    welcome: function (req, res) {
        console.log("GET executed on root")
        res.send("Primer Hello world")
    },
}

module.exports = controller;
