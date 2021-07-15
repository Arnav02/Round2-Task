const express = require('express');
const router = express.Router();

const user = require('./users.js');
const role = require('./roles.js');
const student = require('./students.js');
const school = require('./schools.js');

router.use("/", user);
router.use("/", role);
router.use("/", student);
router.use("/", school);

module.exports = router;