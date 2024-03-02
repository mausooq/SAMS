// Importing express module and creating a router object
const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');

// Handling GET request to the root path of the application
router.get('/',(req,res) => {
   res.render('index');
});

// Handling GET request to the '/signup' path of the application
router.get('/signup',(req,res) => {
   res.render('signup');
});
router.get('/login',(req,res) => {
   res.render('login');
});
router.get('/dashboard/',authorization.isLoggedIn,(req,res) => {
  res.render("dashboard", { userId: req.user.id })
});
router.get('/marks/',authorization.isLoggedIn,(req,res) => {
  res.render("marks", { userId: req.user.id })
});
router.get('/projects/',authorization.isLoggedIn,(req,res) => {
  res.render("projects", { userId: req.user.id })
});

router.get('/addProject',authorization.isLoggedIn,(req,res) => {
  res.render("addProject", { userId: req.user.id })
});

router.get('/achievement/',authorization.isLoggedIn,(req,res) => {
  res.render("achievements", { userId: req.user.id })
});
router.get('/addAchievement',authorization.isLoggedIn,(req,res) => {
  res.render("addAchievements", { userId: req.user.id })
});
router.get('/internship',authorization.isLoggedIn,(req,res) => {
  res.render("internship", { userId: req.user.id })
});
router.get('/addInternship',authorization.isLoggedIn,(req,res) => {
  res.render("addInternship", { userId: req.user.id })
});
router.get('/awards',authorization.isLoggedIn,(req,res) => {
  res.render("awards", { userId: req.user.id })
});
router.get('/addAwards',authorization.isLoggedIn,(req,res) => {
  res.render("addAwards", { userId: req.user.id })
});
router.get('/EXTRA_CURRICULAR_ACTIVITIES',authorization.isLoggedIn,(req,res) => {
  res.render("eca", { userId: req.user.id })
});
router.get('/addEca',authorization.isLoggedIn,(req,res) => {
  res.render("addEca", { userId: req.user.id })
});
router.get('/profile',authorization.isLoggedIn,(req,res) => {
  res.render("profile", { userId: req.user.id })
});
router.get('/sgpa',authorization.isLoggedIn,(req,res) => {
  res.render("sgpa", { userId: req.user.id })
});
router.get('/cgpa',authorization.isLoggedIn,(req,res) => {
  res.render("cgpa", { userId: req.user.id })
});

// Exporting the router object
module.exports = router;