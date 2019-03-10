const express = require('express');
const PicturesController = require('../controller/Pictures.controller');

const router = express.Router();

const picture = new PicturesController();

router.post('/create', (req, res, next) => picture.setNewPicture(req, res, next));
router.get('/all', (req, res, next) => picture.getAllPictures(req, res, next));
router.post('/delete/:name', (req, res, next) => picture.deletePicture(req, res, next));
router.post('/get/:name', (req, res, next) => picture.getPicture(req, res, next));
router.post('/update/:name', (req, res, next) => picture.updatePicture(req, res, next));

module.exports = router;
