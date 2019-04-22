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
	gender: [String],
	comments: [ {body: String, stars:Number, user: String}],
	diaper: Boolean,
	tp_ply: Number,
	social_obligation: String, // public, private, purchase
	stars: Number,
	fem_p: {type: Boolean, default: false}
});

module.exports = mongoose.model('Br_Model', Br_Model);
