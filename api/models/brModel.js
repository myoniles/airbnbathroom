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
	comments: [ {body: String, stars:Number, user: String, posted: Date}],
	open_t: Number,
	close_t: Number,
	diaper: Boolean,
	tp_ply: Number,
	social_obligation: String,
	stars: Number
});

Br_Model.pre('save', function(next) {
	var br = this;
	var star_tot = 0;
	for (var i = 0; i < br.comments.length; i++){
		star_tot = star_tot + br.comments[i];
	}
	if ( br.comments.length != 0 )
		br.stars = star_tot / br.comments.length

	next();

});

module.exports = mongoose.model('Br_Model', Br_Model);
