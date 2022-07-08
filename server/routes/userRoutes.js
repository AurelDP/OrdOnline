const express = require("express");
const router = express.Router();
const userController = require('../controller/userController.js');
const auth = require('../middleware/auth.js');

router.post('/register', userController.saveUser);
router.post('/login', userController.login);
router.get('/getInfo', auth, userController.getInfo);
router.post('/saveInfo', auth, userController.saveInfo);

module.exports = router;
