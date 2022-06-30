const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController.js');

router.get('/get', homeController.getAll);

module.exports = router;