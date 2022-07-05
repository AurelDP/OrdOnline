const express = require("express");
const router = express.Router();
const prescriptionController = require('../controller/prescriptionController.js');
const auth = require('../middleware/auth.js');

router.post('/add', auth, prescriptionController.add);
router.get('/:prescriptionId', prescriptionController.findById);
router.get('/:prescriptionId/statuses', prescriptionController.findStatusesById);

module.exports = router;