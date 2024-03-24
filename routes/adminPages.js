// Importing express module and creating a router object
const express = require('express');
const router = express.Router();
const adminAuthorization = require('../middlewares/adminAuthorization');

// Handling GET request to the root path of the application
router.get('/',(req,res) => {
    res.render('adminLogin');
 });
 
router.get('/Dashboard',adminAuthorization.isLoggedIn,(req,res) => {
    res.render( 'adminDashboard' );
 });
router.get('/studentDashboard',adminAuthorization.isLoggedIn,(req,res) => {
    const studentId=parseInt(req.query.id);
      res.render('studentDashboard',{studentId})
 });
router.get('/marks',adminAuthorization.isLoggedIn,(req,res) => {
    const studentId=parseInt(req.query.id);
      res.render('studentMarks',{studentId})
 });
router.get('/projects',adminAuthorization.isLoggedIn,(req,res) => {
    const studentId=parseInt(req.query.id);
      res.render('studentProjects',{studentId})
 });
 


 module.exports= router;