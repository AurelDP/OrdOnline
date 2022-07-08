const express = require("express");
const router = express.Router();
const prescriptionController = require('../controller/prescriptionController.js');
const auth = require('../middleware/auth.js');

router.post('/add', auth, prescriptionController.add);
router.get('/:prescriptionId', auth, prescriptionController.findById);
router.get('/:prescriptionId/statuses', auth, prescriptionController.findStatusesById);
router.post('/:prescriptionId/close', auth, prescriptionController.closeById);
router.post('/:prescriptionId/treatments/delivery', auth, prescriptionController.actualiseTreatmentsDeliveryById);

module.exports = router;