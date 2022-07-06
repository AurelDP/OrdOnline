const express = require("express");
const router = express.Router();
const prescriptionController = require('../controller/prescriptionController.js');
const auth = require('../middleware/auth.js');

router.post('/add', auth, prescriptionController.add);
router.get('/:prescriptionId', prescriptionController.findById);
router.get('/:prescriptionId/statuses', prescriptionController.findStatusesById);
router.post('/:prescriptionId/close', prescriptionController.closeById);
router.post('/treatment/:treatmentId/delivery', prescriptionController.actualiseById)

module.exports = router;