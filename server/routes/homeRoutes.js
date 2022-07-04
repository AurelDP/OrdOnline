const express = require("express");
const router = express.Router();
const homeController = require('../controller/homeController.js');
const auth = require('../middleware/auth.js');

router.get('/get', auth, homeController.getAll);

module.exports = router;