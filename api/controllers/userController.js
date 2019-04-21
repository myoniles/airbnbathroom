'use strict'

var monggoose = require('mongoose'),
	User_model = mongoose.model('User_Model')

exports.register_user = function(req, res) {
	var new_user = new User_model(req.body);
	new_user.save(function(err,post){
		if (err)
			res.send(err);
		res.json(post);
	});
};
