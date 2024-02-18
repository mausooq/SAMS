// Importing express, body-parser, and the authController
const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('../controllers/authController');
const authorization = require('../middlewares/authorization');

// Creating an instance of express and configuring it to use body-parser
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());


router.post('/signup', Controller.signup);
router.post('/login',Controller.login);
router.get('/logout',Controller.logout);


module.exports = router;

