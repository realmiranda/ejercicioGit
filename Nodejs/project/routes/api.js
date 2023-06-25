"use strict"
const express =  require("express");
const api =  express.Router();
const { body } = require("express-validator"); // Middleware

var WelcomeController = require("../controllers/welcome");
var StudentsController = require("../controllers/students");
var UsersController = require("../controllers/users");
var AuthController = require("../controllers/auth");

let userProtectUrl = require("../middlewares/authUser").userProtectUrl;

api.get("/", WelcomeController.welcome);

api.get("/students", userProtectUrl, StudentsController.students);
api.get("/student/:identifier", userProtectUrl, StudentsController.student);
api.post("/students", userProtectUrl, [
    body("identifier").not().isEmpty(),
    body("name").not().isEmpty(),
    body("age").not().isEmpty(),
    body("gender").not().isEmpty(),
], StudentsController.create_student);
api.put("/student/:identifier", userProtectUrl,  [
    body("identifier").not().isEmpty(),
    body("name").not().isEmpty(),
    body("age").not().isEmpty(),
    body("gender").not().isEmpty(),
], StudentsController.edit_student);
api.delete("/student/:identifier", userProtectUrl, StudentsController.delete_student);


api.get("/users", userProtectUrl, UsersController.users);
api.get("/user/:identifier", userProtectUrl, UsersController.user);
api.post("/users", [
    body("name").not().isEmpty(),
    body("age").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
], UsersController.create_user);
api.put("/user/:identifier", userProtectUrl,  [
    body("name").not().isEmpty(),
    body("age").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
], UsersController.edit_user);
api.delete("/user/:identifier", userProtectUrl, UsersController.delete_user);


api.post("/login",  [
    body("email").not().isEmpty(),
    body("password").not().isEmpty(),
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

module.exports = api;
