const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');

router.get('/sem1',authorization.isLoggedIn,(req,res) => {
    res.render("sem1", { userId: req.user.id })
  });

module.exports = router;