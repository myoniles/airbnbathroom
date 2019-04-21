'use strict'
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10; // Using Zach when he's playing league is too much salt

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

exports.login = function(req, res) {
	res.setHeader("Acces-Control-Allow-Headers", 'username,password')


	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if (err)
			res.send(err);

		console.log(req)
		// first look up username
		User_model.findOne({username: req.headers.username}, function(err, post){
			if (err)
				res.send(err);
			//res.json({response:true});
				if (post == null){
					res.json({response:false, reason:'user not found'})
				}
				bcrypt.compare(req.headers.password, post.password, function(err, hash){
					if(err)
						res.send(err)
					if(hash)
						res.json({resposne:true, cookie:post._id})
					else
						res.json({resposne:false})
				});
			});
	});
};
