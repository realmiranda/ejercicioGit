"use strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = Schema({
    identifier: { type: Number, require: true, unique: true },
    name: { type: String, require: true },
    age: { type: Number, require: true },
    gender: { type: String, require: true },
});

module.exports = mongoose.model("students", StudentSchema);
