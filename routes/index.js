var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', {
    message: "Welcome to Sword Art Online Arena!",
    isAuthenticated: false,
    user: {
      name: "Mason Maines",
    }
  });
});

module.exports = router;
