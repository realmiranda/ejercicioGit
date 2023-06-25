"use strict"

const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Users = require("../models/users");
const generateRandomNumber = require("../utils/generateRandomNumber");

const controller = {
    users: function (req, res) {
        Users
            .find({})
            .then((data) => {
                const message = !data ? "There is no data" : "Success"
                return res.status(200).json({
                    status: 200,
                    message,
                    data,
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: err
                });
            });
    },
    user: function (req, res) {
        const {identifier} = req.params;

        Users
            .findOne({identifier: Number(identifier)})
            .then((data) => {
                if (!data) {
                    return res.status(200).json({
                        status: 200,
                        message: "User not founded"
                    })
                }
                data.password = "***";
                return res.status(200).json({
                    status: 200,
                    message: "Success",
                    data,
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: err
                });
            });
    },
    create_user: async function (req, res) {
        const errors = validationResult(req);
        // Validate data
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }


        const req_body = req.body;
        const identifier = generateRandomNumber();

        Users
            .findOne({email: req_body.email})
            .then( (response) => {
                if (response) {
                    return res.status(200).json({
                        status: 200,
                        message: "User exists. Please dont repeat the email"
                    })
                }

                bcrypt.hash(req_body.password, saltRounds, async function(err, hash) {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: err
                        })
                    }

                    const users_model = new Users();
                    users_model.identifier = identifier;
                    users_model.name = req_body.name;
                    users_model.email = req_body.email;
                    users_model.age = req_body.age;
                    users_model.password = hash;

                    var data = await users_model.save();
                    console.log(data);

                    if (!data) {
                        return res.status(200).json({
                            status: 200,
                            message: "User not register"
                        })
                    }
                    return res.status(200).json({
                        status: 200,
                        message: "Success",
                        data,
                    })
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: err
                });
            });
    },
    edit_user: function (req, res) {
        const errors = validationResult(req);
        // Validate data
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }


        const req_body = req.body;
        const {identifier} = req.params;
        const user_info_update = {
            name: req_body.name,
            email: req_body.email,
            age: req_body.age,
            password: req_body.password,
        };
        Users
            .findOneAndUpdate({identifier: identifier}, user_info_update, {new: true})
            .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        status: 404,
                        message: "User not founded"
                    })
                }
                return res.status(200).json({
                    status: 200,
                    message: "Success",
                    data,
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: err
                });
            });
    },
    delete_user: function (req, res) {
        const {identifier} = req.params;

        Users
            .findOneAndRemove({identifier: identifier})
            .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        status: 404,
                        message: "User not founded"
                    })
                }
                return res.status(200).json({
                    status: 200,
                    message: "Deleted Successfully",
                    data,
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: err
                });
            });
    },
};

module.exports = controller;
