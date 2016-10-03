var express = require('express');
var passport = require('../passport-config');
var router = express.Router();


router.get('/', function(req, res) {

  console.log("req.isAuthenticated(): "+ req.isAuthenticated());
  console.log("req.user: "+ req.user);

  res.render('index', {
    message: "Welcome to Sword Art Online Arena!",
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
});

module.exports = router;
