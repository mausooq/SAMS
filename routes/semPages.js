const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');

router.get('/sem1',authorization.isLoggedIn,(req,res) => {
    res.render("sem1", { userId: req.user.id })
  });
router.get('/sem2',authorization.isLoggedIn,(req,res) => {
    res.render("sem2", { userId: req.user.id })
  });
router.get('/sem3',authorization.isLoggedIn,(req,res) => {
    res.render("sem3", { userId: req.user.id })
  });
router.get('/sem4',authorization.isLoggedIn,(req,res) => {
    res.render("sem4", { userId: req.user.id })
  });
router.get('/sem5',authorization.isLoggedIn,(req,res) => {
    res.render("sem5", { userId: req.user.id })
  });
router.get('/sem6',authorization.isLoggedIn,(req,res) => {
    res.render("sem6", { userId: req.user.id })
  });
router.get('/sem7',authorization.isLoggedIn,(req,res) => {
    res.render("sem7", { userId: req.user.id })
  });
router.get('/sem8',authorization.isLoggedIn,(req,res) => {
    res.render("sem8", { userId: req.user.id })
  });

module.exports = router;