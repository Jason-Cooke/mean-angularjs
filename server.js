// CALL THE PACKAGES ----------------
var express = require('express'); //call express
var app = express();	// define this app using express
var morgan = require('morgan');  // used to see requests
var bodyParser = require('body-parser'); // get body-parser
var mongoose = require('mongoose'); // for working with the database
var config = require('./config');
var path = require('path');


// APP CONFIGURATION -----
// use body parser so this app can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure this app to handle CORS requests
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to database
var url = '';
if (process.env.DEV_ENV) {
	// for local database
	mongoose.connect(config.database, { useMongoClient: true });
	mongoose.Promise = global.Promise;
} else {
	// for online database
	mongoose.connect(url, { useMongoClient: true });
	mongoose.Promise = global.Promise;
}

// set static files location
// used for requests that frontend will make
app.use(express.static(__dirname + '/public'));


// API ROUTES ----------------------------
var apiRoutes = require('./app/routes/api')(app, express); // get api
app.use('/api', apiRoutes); // check



// MAIN CATCHALL ROUTE ----------------
// SEND USERS TO FRONTEND -------------
// Route for homepage
app.get('*', function (req, res) {

	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// START THE SERVER
// ========================================
app.listen(config.port);
console.log("Server running on port: " + config.port);
