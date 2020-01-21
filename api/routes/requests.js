const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requests');



// Handle all request for /Requests 
router.post('/', requestsController.createRequest);

module.exports = router;