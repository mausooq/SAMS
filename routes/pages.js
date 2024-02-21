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
router.get('/dashboard/marks/',authorization.isLoggedIn,(req,res) => {
  res.render("marks", { userId: req.user.id })
});
router.get('/dashboard/projects/',authorization.isLoggedIn,(req,res) => {
  res.render("projects", { userId: req.user.id })
});
router.get('/dashboard/acheivements/',authorization.isLoggedIn,(req,res) => {
  res.render("dashboard", { userId: req.user.id })
});
router.get('/dashboard/internship/',authorization.isLoggedIn,(req,res) => {
  res.render("dashboard", { userId: req.user.id })
});

// Exporting the router object
module.exports = router;