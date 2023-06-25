"use strict"

const Students = require("../models/students");
const { validationResult } = require("express-validator");

const controller = {
    students: function (req, res) {
        Students
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
    student: function (req, res) {
        const {identifier} = req.params;

        Students
            .findOne({identifier: Number(identifier)})
            .then((data) => {
                if (!data) {
                    return res.status(200).json({
                        status: 200,
                        message: "Student not founded"
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
    create_student: async function (req, res) {
        const errors = validationResult(req);
        // Validate data
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }


        const req_body = req.body;
        Students
            .findOne({identifier: Number(req_body.identifier)})
            .then(async (response) => {
                if (response) {
                    return res.status(200).json({
                        status: 200,
                        message: "User exists. Please dont repeat the identifier"
                    })
                }

                const students_model = new Students();
                students_model.identifier = req_body.identifier;
                students_model.name = req_body.name;
                students_model.age = req_body.age;
                students_model.gender = req_body.gender;

                var data = await students_model.save();
                console.log(data);
                if (!data) {
                    return res.status(200).json({
                        status: 200,
                        message: "Student not register"
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
    edit_student: function (req, res) {
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
        const student_info_update = {
            name: req_body.name,
            age: req_body.age,
            gender: req_body.gender,
        };
        Students
            .findOneAndUpdate({identifier: identifier}, student_info_update, {new: true})
            .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        status: 404,
                        message: "Student not founded"
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
    delete_student: function (req, res) {
        const {identifier} = req.params;

        Students
            .findOneAndRemove({identifier: identifier})
            .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        status: 404,
                        message: "Student not founded"
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
