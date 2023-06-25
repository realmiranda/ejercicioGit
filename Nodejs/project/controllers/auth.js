"use strict"
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Users = require("../models/users");
const Sessions = require("../models/sessions");
const { validationResult } = require("express-validator");
const privateKey = "M6mbYH%1O8Bio7uGr3Fq#9*Z5e32Oy0bHhQLP5MWMei&xYOecl";

const controller = {
    login: function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }

        const { email, password } = req.body;

        Users
            .findOne({ email })
            .then((data) => {
                if (!data) {
                    return res.status(500).json({
                        status: 500,
                        message: "Email is incorrect"
                    })
                }

                bcrypt.compare(password, data.password, function(err, result) {
                    if(result) {

                        const payload = {
                            user_id: data._id,
                        };
                        const access_token = jwt.sign(payload, privateKey, {
                            expiresIn: "1d",
                        });
                        const update = {
                            user_id: data._id,
                            jwt: access_token,
                        }
                        Sessions.findOneAndUpdate({user_id: data._id} , update, {
                            upsert: true, new: true,
                        })
                            .then((data) => {
                                if (!data) {
                                    return res.status(404).json({
                                        status: 404,
                                        message: "Wrong data"
                                    })
                                }

                                return res.status(200).json({
                                    status: 200,
                                    message: "Login successful",
                                    token: access_token,
                                })
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    status: 500,
                                    message: err
                                });
                            });
                    } else {
                        return res.status(500).json({
                            status: 500,
                            message: "Password is incorrect"
                        })
                    }
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    status: 500,
                    message: err
                });
            });
    },
    logout: function (req, res) {
        const { user_id } = req.decoded;

        Sessions
            .findOneAndRemove({user_id})
            .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        status: 404,
                        message: "Data invalid"
                    })
                }

                return res.status(200).json({
                    status: 200,
                    message: "Logout successful",
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
