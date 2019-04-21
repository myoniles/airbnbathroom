var mongoos = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10; // Using Zach when he's playing league is too much salt

var User_Model = new Schema({
	username: {
		type: String,
		required: 'Select a username',
		unqiue: true
	},
	password: {
		type: String,
		required: 'Choose a password'
	}
});



// This method of salting and hashing is copied almost directly from
// the one found on mondodb.org:
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
User_Model.pre('save', function(next) {
	var user = this;

	// only hash if passwrd is new
	if (!user.isModified('password')) return next();

	// enough salt to be a LoL player
	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User_Model', User_Model);
