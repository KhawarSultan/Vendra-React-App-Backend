// vendorRoutes.js
const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

// Vendor registration
router.post('/register', vendorController.register);

// Vendor login
router.post('/login', vendorController.login);

// Vendor management (approval, etc.)
router.post('/manage', vendorController.manage);
router.get('/getallvendors', vendorController.getallvendors);
router.post('/updateApproval/:vendorId', vendorController.updateApproval);
module.exports = router;
