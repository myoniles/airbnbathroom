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
	if (req.body.stars)
		req.body.stars = { $gte: req.body.stars};
	if (req.body.tp_ply)
		req.body.tp_ply = { $gte: req.body.tp_ply};
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

function my_round(n, p){
	p = Math.pow(10, p);
	return Math.round(n*p) / p
}

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
		}
		if ( post.comments.length != 0 )
			post.stars = my_round(star_tot / post.comments.length, 1)
		post.save();
		res.json({response:true});
	});
};
