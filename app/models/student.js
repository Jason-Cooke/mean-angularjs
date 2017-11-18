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