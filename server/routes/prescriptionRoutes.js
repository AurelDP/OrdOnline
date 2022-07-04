const express = require("express");
const router = express.Router();
const prescriptionController = require('../controller/prescriptionController.js');

router.post('/add', prescriptionController.add);

module.exports = router;