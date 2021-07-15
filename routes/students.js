const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const User = require('../models/user');
const School = require('../models/school');
const { validationResult } = require('express-validator');

router.route('/student').get((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        Student.find({})
            .then((response) => {
                res.status(201).json({
                    message: 'Student found successfully',
                    result: response
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: err
                })
            })
    }
})

router.route('/student').post((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        const student = new Student({
            name: req.body.name,
            userId: req.body.userId,
            schoolId: req.body.schoolId
        })
        student.save()
            .then((response) => {
                School.findOne({ _id: req.body.schoolId })
                    .then((foundSchool) => {
                        foundSchool.students.push(response);
                        foundSchool.save()
                            .then((response) => {
                                res.status(201).json({
                                    message: 'Student created successfully',
                                    result: response
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
})

module.exports = router;