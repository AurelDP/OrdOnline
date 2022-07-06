const express = require("express");
const router = express.Router();
const doctorController = require('../controller/doctorController.js');
const auth = require('../middleware/auth.js');

router.get('/getPatients', auth, doctorController.getPatients);

module.exports = router;
