'use strict';


module.exports = function(app) {
	var bnbr_controller = require('../controllers/brController')

	app.route('/')
		.get( function(req, res){
			res.sendFile( './web/index.html');
		});
	app.route('/google_maps.js')
		.get( function(req, res){
			res.sendFile( './web/google_maps.js');
		});
	app.route('/style.css')
		.get( function(req, res){
			res.sendFile( './web/style.css');
		});



	app.route('/bathrooms:brId')
		.get(bnbr_controller.get_br_info);

}
