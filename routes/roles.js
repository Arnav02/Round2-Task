const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const Role = require('../models/role');

router.route('/role').get((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        Role.find({})
            .then((response) => {
                res.status(201).json({
                    status: 'true',
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

router.route('/role').post((req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        const role = new Role({
            name: req.body.role
        })
        role.save()
            .then((response) => {
                res.status(201).json({
                    message: 'Role assigned successfully',
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