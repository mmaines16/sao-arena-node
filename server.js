var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var exphbs = require('express-handlebars');
var passport = require('./passport-config');
var passportLocal = require('passport-local');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var session = require('express-session');

//import Routes
var indexRoutes = require('./routes/index');
var accountRoutes = require('./routes/account');
var apiRoutes = require('./routes/api');
var consoleRoutes = require('./routes/console');

//import all mongoose models
var User = require('./models/user');

//Initialize Express Server
var server = express();
var PORT = 3000;

//Set up template view engine
server.engine('handlebars', exphbs({defaultLayout: 'main'}));
server.set('view engine', 'handlebars');
server.set('views', path.join(__dirname, 'views'));
//server.enable('view cache');

//server static files
server.use(express.static('public'));
server.use(express.static('media'));

//Middleware Setup

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(cookieParser());

console.log("Passport in server.js "+ passport);

server.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));


//============ Configure Passport with Local Strategy ====================================
server.use(passport.initialize());
server.use(passport.session());


//========================================================================================

//Connect to mongodb database
if('development' == server.get('env')){
  mongoose.connect('mongodb://localhost/sao-arena');
}

//Configure Routes
server.use('/', indexRoutes);
server.use('/api', apiRoutes);
server.use('/account', accountRoutes);
server.use('/console', consoleRoutes);


//Start Listening for requests
server.listen(PORT, function(err) {
  if(err)
    console.log(err.message);

  console.log("Server listening on port " + PORT + "...\n");
});
