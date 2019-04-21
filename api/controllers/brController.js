'use strict'

var monggoose = require('mongoose'),
	Br_Model = mongoose.model('Br_Model')

exports.register_br = function(req, res) {
	var new_br = new Br_Model(req.body);
	new_br.save(function(err,post){
		if (err)
			res.send(err);
		res.json(post);
	});
};

exports.get_br_info = function(req, res) {
	Br_Model.findById(req.params.brId, function(err, br) {
		if (err)
			res.send(err);
		res.json(br);
	});
};

exports.get_all_br_info = function(req, res) {
	Br_Model.find({}, function(err, post){
		if (err)
			res.send(err);
		res.json(post);
	});
};

exports.search_br = function(req, res) {
	Br_Model.find(req.body, function(err, post){
		if (err)
			res.send(err);
		res.json(post);
	});
};


exports.edit_br = function(req, res) {
	Br_Model.findOneAndUpdate({_id: req.params.brId}, req.body, {new: true}, function(err, br){
		if (err)
			res.send(err);
		res.json(br);
	});
};


exports.delete_br = function(req, res) {
	Br_Model.remove({
		_id: req.params.brId
	}, function(err, post) {
			if (err)
				res.send(err);
			res.json({ message: 'Bathroom successfully deleted'})
	});
};


exports.get_comments = function(req, res){
	Br_Model.findById(req.params.brId, function(err, br) {
		if (err)
			res.send(err);
		res.json(br.comments);
	});
};

exports.post_a_comment = function(req, res){
	Br_Model.findOne({_id: req.params.brId}, function(err, post){
		if (err)
			res.send(err);
		var potential_c = req.body
		if (potential_c.stars > 5 || potential_c.stars < 1){
			res.json({response:false, reason:"Invalid number of stars"});
			return
		}
		post.comments.push(potential_c);
		var star_tot = 0;
		for (var i = 0; i < post.comments.length; i++){
			if ( post.comments[i].stars != undefined){
			var star_tot = star_tot + post.comments[i].stars;
		}
		if ( post.comments.length != 0 )
			post.stars = star_tot / post.comments.length
		post.save();
		res.json({response:true});
	});
};
