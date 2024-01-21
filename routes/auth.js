// Importing express, body-parser, and the authController
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('../controllers/auth');

// Creating an instance of express and configuring it to use body-parser
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());


router.post('/signup', authController.signup);
module.exports = router;