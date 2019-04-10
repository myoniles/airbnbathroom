'use strict'

var monggoose = require('mongoose'),
	Br_Model = mongoose.model('Br_Model')

exports.get_br_info = function(req, res) {
	Br_Model.findById(req.params.brId, function(err, br) {
		if (err)
			res.send(err);
		res.json(br)
	});
};
