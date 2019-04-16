'use strict';


module.exports = function(app) {
	var bnbr_controller = require('../controllers/brController')

	app.route('/')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/index.html');
		});
	app.route('/google_map.js')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/google_map.js');
		});
	app.route('/style.css')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/style.css');
		});
	app.route('/toilets_inclusive.png')
		.get( function(req, res){
			res.sendFile( '/home/mike/Documents/proj/airbnbathroom/web/toilets_inclusive.png');
		});


	// Routes for a specific bathroom
	app.route('/bathroom/:brId')
		.get(bnbr_controller.get_br_info)
		.put(bnbr_controller.edit_br)
		.delete(bnbr_controller.delete_br);

	// route for abathroom creation
	app.route('/bathrooms')
		.post(bnbr_controller.register_br);

	app.route('/bathrooms_all')
		.get(bnbr_controller.get_all_br_info)
		.post(bnbr_controller.search_br)
}
