const express = require('express');
const UsersController = require('../controller/Users.controller');

const router = express.Router();

const user = new UsersController();

router.post('/create', (req, res, next) => user.setNewUser(req, res, next));
router.get('/all', (req, res, next) => user.getAllUsers(req, res, next));
module.exports = router;
