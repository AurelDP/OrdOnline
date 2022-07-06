const express = require("express");
const router = express.Router();
const patientController = require('../controller/patientController.js');
const auth = require('../middleware/auth.js');

router.post('/getRecord', auth, patientController.getRecord);
router.post('/getPrescriptions', auth, patientController.getPrescriptions);
router.get('/getPharmas', auth, patientController.getPharmas);

module.exports = router;
