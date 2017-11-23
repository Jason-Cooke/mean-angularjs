# MEAN-angularjs
## Single Page Application

This is my first SPA test-project using MEAN-STACK components (angularjs-1.6.6 precisely). The backend consist of 
  `API` with `jsonwebtoken`
```
var bodyParser = require('body-parser'); 
var User       = require('../models/user');
var Student    = require('../models/student');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// Secret for creating tokens
var hiddenSecret = config.secret;

continue on app/routes/api.js
```
**User Schema**
```
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
```
**Student Schema**
```
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
```

## Installation
1. Download the repository
2. Install npm modules: `npm install`
3. Start up the server: `node server.js`
4. View in browser at http://localhost:3000

With lots of work on both the backend and frontend view, I will call it a shot here to move on with latest [angular](http://angular.io/) (v5.x as of the time this was written). 

**Note:** The frontend design view was not awesomely designed as it was not the focus of this project, however I used some bootstrap and fontawesome to tweaks some views.

### Known issues include,
 
- Unable to delete user(staff) profile from the frontend though it works perfectly from the backend
- You may experience browser freezing while trying to get a user profile details when logged-in

*This project is still open for reveiw and corrections*
