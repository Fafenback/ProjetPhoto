const express = require('express');
const UsersController = require('../controller/Users.controller');

const router = express.Router();

const user = new UsersController();

router.use('/', (req, res, next) => user.getCurrent(req, res, next));

module.exports = router;
