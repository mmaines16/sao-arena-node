var bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

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

router.get('/test-password', function(req,res) {
  res.render('test-password', {
    isAuthenticated: false,
    user: null
  });
});

router.post('/test-password', function(req, res) {

  User.findOne({email: req.body.email}, function(err, user){

    //user = JSON.parse(user);
    console.log("User: " + user);
    console.log("User.password: " + user.password);
    console.log("User.email: " + user.email);
    console.log("Post.email: " + req.body.email);
    console.log("Post.email: " + req.body.password);

    console.log("User.hashedPassword: " + user.generateHash(user.password));

    if(err){
      console.log(err);
      res.render('test-password', {
        isAuthenticated: true,
        user: "Error Found"
      });
    }


    if(user.generateHash(req.body.password) == user.password){
      console.log("passwords matched!");
      res.render('test-password', {
        isAuthenticated: true,
        user: user
      });
    }
    else if(req.body.password == user.password){
      console.log("passwords matched!");
      res.render('test-password', {
        isAuthenticated: true,
        user: user
      });
    }
    else {
      res.render('test-password', {
        isAuthenticated: true,
        user: "Passwords Didn't match"
      });
    }
  });
});

module.exports = router;
