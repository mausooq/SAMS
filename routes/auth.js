// Importing express, body-parser, and the authController
const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer')
const path = require('path')
const fs = require('fs')
const Controller = require('../controllers/authController');
const Project = require('../controllers/addProject')
const Achievement = require('../controllers/addAchievement')
const Internship = require('../controllers/addIntership')
const authorization = require('../middlewares/authorization');
// Creating an instance of express and configuring it to use body-parser
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folderName = req.user.NAME;
      const userFolder = `images/${folderName}`
      if(!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder, { recursive: true });
      }
      cb(null, userFolder); // Define the folder where images will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+ '-' + path.extname(file.originalname)); // Generate unique filename
    },
  });
  
const upload = multer({ storage: storage });

router.post('/signup', Controller.signup);
router.post('/login',Controller.login);
router.get('/logout',Controller.logout);

router.post('/addProject',authorization.isLoggedIn,upload.single('projectImage'),Project.uploadProject);
router.post('/addAchievement',authorization.isLoggedIn,upload.single('achievementImage'),Achievement.uploadAchievement);
router.post('/addInternship',authorization.isLoggedIn,upload.single('internshipImage'),Internship.uploadIntership);



module.exports = router;

