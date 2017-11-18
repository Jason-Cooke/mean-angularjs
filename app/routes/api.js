var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var Student    = require('../models/student');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// Secret for creating tokens
var hiddenSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // find the user
	  User.findOne({
	    username: req.body.username
	  }).select('username password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'User not found, try again.' 
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Wrong password, try again.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	username: user.username
	        }, hiddenSecret, {
	          expiresIn: '24h' // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          token: token
	        });
	      }   

	    }

	  });
	});


	// on routes that end in /register
	// ----------------------------------------------------
	apiRouter.route('/register')

		// create a user (accessed at POST http://localhost:8080/register)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.username = req.body.username;
			user.password = req.body.password;  
			user.firstname = req.body.firstname;
			user.lastname = req.body.lastname;
			user.dob = req.body.dob;
			user.gender = req.body.gender;
			user.mobile = req.body.mobile;
			user.city = req.body.city;
			user.state = req.body.state;
			user.address = req.body.address;
			user.tclass = req.body.tclass;			

			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		});

		apiRouter.route('/result')
		// get all the student names (accessed at GET http://localhost:8080/api/result)
		.get(function(req, res) {

			Student.find({}, function(err, students) {
				if (err) res.send(err);

				// return the students
				res.json(students);
			});
		});

// route middleware to verify a token
	apiRouter.use(function(req, res, next) {

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, hiddenSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); 
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	apiRouter.route('/users')
	// get all the students in each class (accessed at GET http://localhost:8080/api/users)
	.get(function(req, res) {

		Student.find({}, function(err, students) {
			if (err) res.send(err);

			// return the students
			res.json(students);
		});
	});
	
apiRouter.route('/users/profile')
		
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});



apiRouter.route('/users/create/student')

		// create a student (accessed at POST http://localhost:8080/users/create/student)
		.post(function(req, res) {
			
			// Student data
			var student = new Student();
			student.firstname = req.body.firstname;
			student.lastname = req.body.lastname;
			student.dob = req.body.dob;
			student.gender = req.body.gender;
			student.level = req.body.level;
			student.mobile = req.body.mobile;
			student.city = req.body.city;
			student.parentsname = req.body.parentsname;
			student.parentsnumber = req.body.parentsnumber;
			student.state = req.body.state;
			student.address = req.body.address;

			student.save(function(){
				res.json({ message: 'Student created!'});
			});

		});


	// on routes that end in /users/profile/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/profile/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;
				if (req.body.firstname) user.firstname = req.body.firstname;
				if (req.body.lastname) user.lastname = req.body.lastname;
				if (req.body.address) user.address = req.body.address;
				if (req.body.city) user.city = req.body.city;
				if (req.body.state) user.state = req.body.state;
				if (req.body.dob) user.dob = req.body.dob;
				if (req.body.gender) user.gender = req.body.gender;
				if (req.body.mobile) user.mobile = req.body.mobile;
				if (req.body.tclass) user.tclass = req.body.tclass;

				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		});

apiRouter.route('/users/setting/:user_id')
		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

	apiRouter.route('/users/:student_id')

	// get the student with that id
		.get(function(req, res) {
			Student.findById(req.params.student_id, function(err, student) {
				if (err) res.send(err);

				// return that student
				res.json(student);
			});
		})


	// delete the student with this id
			.delete(function(req, res) {
				Student.remove({
					_id: req.params.student_id
				}, function(err, student) {
					if (err) res.send(err);

					res.json({ message: 'Successfully deleted' });
				});
			});

	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};