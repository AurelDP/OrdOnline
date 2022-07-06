const express = require("express");
const router = express.Router();
const patientController = require('../controller/patientController.js');
const auth = require('../middleware/auth.js');

router.post('/getRecord', auth, patientController.getRecord);
router.post('/getPrescriptions', auth, patientController.getPrescriptions);
router.post('/getAllByParam', auth, patientController.getAllByParam);
router.post('/addPatientToDoctor', auth, patientController.addPatientToDoctor);
router.get('/getPharmas', auth, patientController.getPharmas);
router.get('/getDoctors', auth, patientController.getDoctors);

module.exports = router;
