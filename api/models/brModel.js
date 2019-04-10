var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var Br_Model = new Schema({
	name: {
		type: String,
		required: true
	},
	loc: {
		type: String,
		// TODO add google maps integration to current location
		default: "0,0"
	},
	gender: { type: String, default:'Not Specified'},
	open_t: Number,
	close_t: Number,
	diaper: Boolean,
	tp_ply: Number,
	social_obligation: String,
	stars: Number
});

module.exports = mongoose.model('Br_Model', Br_Model);
