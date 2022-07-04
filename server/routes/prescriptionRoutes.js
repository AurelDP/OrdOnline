const express = require("express");
const router = express.Router();
const prescriptionController = require('../controller/prescriptionController.js');
const auth = require('../middleware/auth.js');

router.post('/add', auth, prescriptionController.add);

module.exports = router;