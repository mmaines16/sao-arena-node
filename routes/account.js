var express = require('express');
var router = express.Router();
var passport = require('../passport-config');

var User = require('../models/user');

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {successRedirect: '/'}), function(req, res) {

  console.log("in /login cookie: " + req.cookie);
  console.log("in post /login: req.user: "+ req.user);
  console.log("req.session: " + req.session);

  req.session.save(() => {
    //res.header('Access-Control-Allow-Credentials', true);
    //res.redirect('/');
  })




});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res) {
  res.render('register', {error: false});
});

router.post('/register', function(req, res) {

  //if passwords do not match
  if(req.body.password != req.body.password)
  {
    console.log("Passwords Do Not Match");
    res.render('register', {error: true, message: "Passwords Do Not Match"});

    return;
  }

  User.find({$or:[{username: req.body.username},{email: req.body.email}]}, function(err, users){
    console.log(users);
    console.log(users.length);

    if(users.length > 0) {
      res.render('register', {error: true, message: "Username or email taken"});
      return;
    }

    console.log("Register Success");

    try{
      var newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: "",
        profile: {
          characters: [],
          wins: 0,
          losses: 0,
          winstreak: 0,
          picture: []
        },
        isAdmin: false
      });

      newUser.password = newUser.generateHash(req.body.password);

      console.log("newUser: " + newUser);
      newUser.save();

      res.redirect('/');
    }catch(err) {
      console.log("REGISTRATION ERROR!!!");
      res.render('register', {error: true, message: "Couldnot save user to database"});
    }

  });

});


router.get('/activate/:username/:activationKey', function(req, res){
  res.redirect('/');
});

module.exports = router;
