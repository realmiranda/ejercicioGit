"use strict"
const jwt = require("jsonwebtoken");
const privateKey = "M6mbYH%1O8Bio7uGr3Fq#9*Z5e32Oy0bHhQLP5MWMei&xYOecl";

const Sessions = require("../models/sessions");

const middlewares = {
    userProtectUrl: function (req, res, next) {
        const token = req.headers["access-token"];

        if(token) {
            jwt.verify(token, privateKey, {}, (err, decoded) => {
                if(err) {
                    res.status(403).send({
                        message: "Token invalid"
                    })
                } else {
                    req.decoded = decoded;

                    Sessions.findOne({ user_id: decoded.user_id, jwt: token})
                        .then((data) => {
                            if (!data) {
                                return res.status(404).json({
                                    status: 404,
                                    message: "Token expired"
                                })
                            }
                            next();
                        })
                        .catch((err) => {
                            return res.status(500).json({
                                status: 500,
                                message: err
                            });
                        });
                }
            });
        } else {
            res.status(403).send({
                message: "Token invalid"
            })
        }
    }
}

module.exports = middlewares;
