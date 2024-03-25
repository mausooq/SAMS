// Importing express, body-parser, and the authController
const express = require('express');
const bodyParser = require('body-parser');
const Student =require('../controllers/Admin/student')
const project =require('../controllers/Admin/project')
const adminController = require('../controllers/Admin/authcontroller.js');
const adminAuthorization = require('../middlewares/adminAuthorization');
const achievement = require('../controllers/Admin/achievement.js')
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('images'));

router.post('/login',adminController.login);

router.get('/student',adminAuthorization.isLoggedIn,Student.getStudent)
router.get('/project',adminAuthorization.isLoggedIn,project.displayProject)
router.get('/achievement',adminAuthorization.isLoggedIn,achievement.displayAchievement)

router.get('/logout',adminController.logout);
module.exports= router;