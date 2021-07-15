const express = require('express');
const router = express.Router();
const School = require('../models/school');
const { validationResult } = require('express-validator');

router.route('/school').get((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        School.find({})
            .then((response) => {
                res.status(201).json({
                    message: 'Schools listed successfully',
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

router.route('/school').post((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        const school = new School({
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        })
        school.save()
            .then((response) => {
                res.status(201).json({
                    message: 'School created successfully',
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

router.route('/school/students').get((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        School.find({ _id: req.body.schoolId })
            .then((response) => {
                res.status(201).json({
                    message: 'Students found successfully',
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

module.exports = router;