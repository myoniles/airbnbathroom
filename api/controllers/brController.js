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
	Br_Model.find(req.body, function(err, post){
		if (err)
			res.send(err);
		res.json(post.comments);
	});
};

exports.post_a_comment = function(req, res){
	Br_Model.find(req.body, function(err, post){
		if (err)
			res.send(err);
		potential_c = req.params
		if (potential_c.stars > 5 || potential_c.stars < 1)
			res.json(null);
		post.comments.append(potential_c);
		res.json(post.comments);
	});
};
