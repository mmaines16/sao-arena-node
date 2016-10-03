var passport = require('passport');
var passportLocal = require('passport-local');

var User = require('./models/user');


//Create Function for local Strategy User Login
passport.use(new passportLocal.Strategy('local', function(username, password, doneCallback) {
  console.log("In Passport Strategy Middleware function...");
  console.log("  >finding user " + username + "...");
  User.findOne({
    $or:[
      {username: username},
      {email: username}
    ]
  }, function(err, user) {
    console.log("  >In Mongoose findOne query callback...");

    if(err) {
      console.log("    >ERROR FOUND! " + err.message);
      doneCallback(err);
      return;
    }
    if(user.isValidPassword(password)){
      console.log("    >User FOUND and password is VALID");
      console.log("        >user found: " + user);
      doneCallback(null, user);
    }
    else {
      console.log("    >User FOUND and password is NOT VALID");
      doneCallback(null, null);
    }
  });
}));


passport.serializeUser(function(user, doneCallback){
  doneCallback(null, user._id);
});

passport.deserializeUser(function(id, doneCallback){
  User.findOne({_id: id}, function(err, user) {
    if(err){
      doneCallback(err, null);
    }
    else if(user) {
      doneCallback(null, user);
    }
    else{
      doneCallback(null, null);
    }
  });

});


module.exports = passport;
