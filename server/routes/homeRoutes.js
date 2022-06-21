const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController.js');

router.post('/home', homeController.getTitle);

module.exports = router;