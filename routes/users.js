const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require('../models/role');
const authorize = require("../middlewares/auth");
const { validationResult } = require('express-validator');


router.post('/user/signup', (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        bcrypt.hash(req.body.password, 12)
            .then((hash) => {
                Role.findOne({ name: req.body.role })
                    .then(foundRole => {
                        if (!foundRole) {
                            return res.status(404).json({
                                message: 'Role not found'
                            })
                        }
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            roleId: foundRole._id
                        })
                        user.save()
                            .then((response) => {
                                res.status(201).json({
                                    message: 'User created successfully',
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
    }
})

router.post('/user/signin', (req, res, next) => {
    let getUser;
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'Authentication failed'
                })
            }
            getUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(response => {
            if (!response) {
                return res.status(401).json({
                    message: 'Authentication failed'
                })
            }
            let jwToken = jwt.sign({
                email: getUser.email,
                userId: getUser._id
            }, 'longerthekeybetteritis', {
                expiresIn: '1h'
            })
            res.status(200).json({
                token: jwToken,
                expiresIn: 3600,
                msg: getUser
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication failed'
            })
        })
})

router.route('/user').get((req, res, next) => {
    User.find((err, response) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(response);
        }
    })
})

router.route('/user/:id').get(authorize, (req, res, next) => {
    User.findById(req.params.id, (err, response) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json({
                msg: response
            });
        }
    })
})

module.exports = router;