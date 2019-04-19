var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var Br_Model = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	lat: {type:Number, required: true, unique: true, dropDups: true},
	lng: {type:Number, required: true, unique: true, dropDups: true},
	gender: { type: String, default:'Not Specified'},
	comments: [ {body: String, posted: Date}],
	open_t: Number,
	close_t: Number,
	diaper: Boolean,
	tp_ply: Number,
	social_obligation: String,
	stars: Number
});

module.exports = mongoose.model('Br_Model', Br_Model);
