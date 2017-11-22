<h1>MEAN-angularjs</h1>
<h2>Single Page Application</h2>

<p>This is my first SPA test-project using MEAN-STACK components (angularjs-1.6.6 precisely). The backend consist of 
  <code>API</code> with <code>jsonwebtoken</code>
<pre>
var bodyParser = require('body-parser'); 
var User       = require('../models/user');
var Student    = require('../models/student');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// Secret for creating tokens
var hiddenSecret = config.secret;

continue on app/routes/api.js
</pre>
<code>User Schema</code>
<pre>
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// user schema
var UserSchema   = new Schema({
	firstname: String,
	lastname: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false },
	address: String,
	city: String,
	state: String,
	dob: String,
	gender: String,
	mobile: String,
	tclass: String
	
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', UserSchema);
</pre>
<code>Student Schema</code>
<pre>
  var mongoose     = require('mongoose');
  var Schema       = mongoose.Schema;
  
  
  // Student schema
  var StudentSchema = new Schema ({
    
      firstname: String,
      lastname: String,
      gender: String,
      dob: String,
      level: String,
      mobile: Number,
      city: String,
      parentsname: String,
      parentsnumber: Number,
      state: String,
      address: String
    
    
  });
  
  module.exports = mongoose.model('Student', StudentSchema);
</pre>
<h2>Usage</h2>
<p>Download or clone the project</p>
<p>Install the dependencies using <code>npm install</code> and start the server by running <code>node server</code> in the terminal. Open your browser on <code>http://localhost:3000</code></p>
<p>With lots of work on both the backend and frontend view, I will call it a shot here to move on with latest <a href=http://angular.io> <b>angular</b></a> (v5.x as of the time this was written).</p> 
<p><b>Note: </b>The frontend design view was not awesomely designed as it was not the focus of this project, however I used some bootstrap and fontawesome to tweaks some views.</p>
<p>Known issues include,
  <ul>
  <li>Unable to delete user(staff) profile from the frontend though it works perfectly from the backend</li>
  <li>You may experience browser freezing while trying to get a user profile details when logged-in</li>
  </ul>
  <i>*The project is still opening for reveiw and corrections</i>
</p>
