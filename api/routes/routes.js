'use strict';


module.exports = function(app) {
	var bnbr_controller = require('../controllers/brController')

	app.route('/')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/index.html');
		});
	app.route('/google_maps.js')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/google_maps.js');
		});
	app.route('/style.css')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/style.css');
		});

	// Routes for a specific bathroom
	app.route('/bathrooms:brId')
		.get(bnbr_controller.get_br_info)
		.put(bnbr_controller.edit_br)
		.delete(bnbr_controller.delete_br);

	// route for abathroom creation
	app.route('/bathroom')
		.post(bnbr_controller.register_br);

}
