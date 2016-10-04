var express = require('express');
var passport = require('../passport-config');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{
    res.render('console', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      context: {
        type: "Home",
        payload: {},
        isHome: true,
        isUsers: false,
        isCharacters: false,
        isSkills: false,
        isSpecific: false
      },
    });
  }

});

router.get('/users', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{

    var context = {
      type: "Users",
      payload: [],
      isHome: false,
      isUsers: true,
      isCharacters: false,
      isSkills: false,
      isSpecific: false
    }

    User.find({}, function(err, users){
      if(err){
        res.redirect('/console');
        console.log(err.message);
      }

      console.log("In /console/users: USERS FOUND");
      console.log("    >users: " + users);
      context.payload = users;
      console.log("CONTEXT: " + context);

      res.render('console', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        context: context,
      });
    });
  }

});

router.get('/users/:username', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{
    var context = {
      type: "Users",
      payload: [],
      isHome: false,
      isUsers: true,
      isCharacters: false,
      isSkills: false,
      isSpecific: true,
    }

    User.findOne({username: req.params.username}).populate('characters').exec(function(err, user){
      if(err){
        console.log(err.message);
        res.redirect('/console/users');
      }

      console.log("\n\nIN /console/user/:username");
      console.log("USER FOUND: " + user);

      context.payload = user;

      res.render('console', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        context: context,
      });
    });


  }

});

router.get('/characters', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{
    res.render('console', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      context: {
        type: "Characters",
        payload: [],
        isHome: false,
        isUsers: false,
        isCharacters: true,
        isSkills: false,
        isSpecific: false
      },
    });
  }

});

router.get('/characters/:characterId', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{
    res.render('console', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      context: {
        type: "Character",
        payload: {},
        isHome: false,
        isUsers: false,
        isCharacters: true,
        isSkills: false,
        isSpecific: true
      },
    });
  }

});


router.get('/skills', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{
    res.render('console', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      context: {
        type: "Skills",
        payload: [],
        isHome: false,
        isUsers: false,
        isCharacters: false,
        isSkills: true,
        isSpecific: false
      },
    });
  }

});

router.get('/skills/:skillId', function(req, res) {

  if(!req.isAuthenticated()){
    res.redirect('/account/login');
  }
  else if(!req.user.isAdmin){
    res.redirect('/');
  }
  else{
    res.render('console', {
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      context: {
        type: "Skills",
        payload: {},
        isHome: false,
        isUsers: false,
        isCharacters: false,
        isSkills: true,
        isSpecific: true
      },
    });
  }

});

module.exports = router;
