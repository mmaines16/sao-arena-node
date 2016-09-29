var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');

//import Routes
var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');

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

//Middleware Setup


//Connect to mongodb database
if('development' == server.get('env')){
  mongoose.connect('mongodb://localhost/sao-arena');
}

//Configure Routes
server.use('/', indexRoutes);
server.use('/api', apiRoutes);


//Start Listening for requests
server.listen(PORT, function(err) {
  if(err)
    console.log(err.message);

  console.log("Server listening on port " + PORT + "...\n");
});
