"use strict"
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = Schema({
    identifier: { type: Number, require: true, unique: true },
    name: { type: String, require: false },
    age: { type: Number, require: false },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
});

module.exports = mongoose.model("users", UsersSchema);
