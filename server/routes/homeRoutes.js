const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController.js');

router.post('/get', homeController.getAll);

module.exports = router;