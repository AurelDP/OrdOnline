const express = require("express");
const router = express.Router();
const pharmaController = require('../controller/pharmaController.js');
const auth = require('../middleware/auth.js');

router.post('/getAllByParam', auth, pharmaController.getAllByParam);
router.post('/addPharmaToPrescription', auth, pharmaController.addPharmaToPrescription);

module.exports = router;
