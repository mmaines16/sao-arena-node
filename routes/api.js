var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res){
  res.send('API Reached');
});

router.get('/users', function(req, res) {
  console.log("finding users");
  User.find(function(err, users){
    if(err) {
      res.send(500);
    }
    else {
      console.log(users);
      res.send(users);
    }
  });

});

module.exports = router;
