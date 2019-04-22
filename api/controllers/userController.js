'use strict'
var bcrypt = require('bcrypt');
var SALT_FACTOR = 10; // Using Zach when he's playing league is too much salt

var monggoose = require('mongoose'),
	User_model = mongoose.model('User_Model')

exports.register_user = function(req, res) {
	var new_user = new User_model(req.body);
	new_user.save(function(err,post){
		if (err){
			console.log(err);
			res.json({response: false});
		}
		else
			res.json({response: true, cookie:post._id, usern: post.username});
	});
};

exports.login = function(req, res) {
	res.setHeader("Acces-Control-Allow-Headers", 'username,password')


	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if (err)
			res.send(err);
		User_model.findOne({username: req.body.username}, function(err, post){
			if (err)
				res.send(err);
			if (!post || post == null){
				res.json({response:false})
				return;
			}
			bcrypt.compare(req.body.password, post.password, function(err, hash){
				if(err)
					res.send(err)
				if(hash)
					res.json({response:true, cookie:post._id, usern:req.body.username})
				else
					res.json({response:false})
			});
		});
	});
};
