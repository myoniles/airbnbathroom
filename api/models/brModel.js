var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var Br_Model = new Schema({
	name: {
		type: String,
		required: true
	},
	lat: {type:Number, required: true},
	lng: {type:Number, required: true},
	gender: { type: String, default:'Not Specified'},
	open_t: Number,
	close_t: Number,
	diaper: Boolean,
	tp_ply: Number,
	social_obligation: String,
	stars: Number
});

module.exports = mongoose.model('Br_Model', Br_Model);
