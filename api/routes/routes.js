'use strict';


module.exports = function(app) {
	var bnbr_controller = require('../controllers/brController')
	var user_controller = require('../controllers/userController')

	app.route('/')
		.get( function(req, res){
			res.sendFile( '/home/mike/airbnbathroom/web/index.html');
		});
	app.route('/br.html')
		.get( function(req, res){
			res.sendFile( '/home/mike/airbnbathroom/web/br.html');
		});
	app.route('/google_map.js')
		.get( function(req, res){
			res.sendFile( '/home/mike/airbnbathroom/web/google_map.js');
		});
	app.route('/user.js')
		.get( function(req, res){
			res.sendFile( '/home/mike/airbnbathroom/web/user.js');
		});
	app.route('/style.css')
		.get( function(req, res){
			res.sendFile( '/home/mike/airbnbathroom/web/style.css');
		});
	app.route('/toilets_inclusive.png')
		.get( function(req, res){
			res.sendFile( '/home/mike/airbnbathroom/web/toilets_inclusive.png');
		});

	// Routes for a specific bathroom
	app.route('/bathroom/:brId')
		.get(bnbr_controller.get_br_info)
		.put(bnbr_controller.edit_br)
		.delete(bnbr_controller.delete_br);

	// route for abathroom creation
	app.route('/bathrooms')
		.post(bnbr_controller.register_br);

	// interacting with all br objects
	app.route('/bathrooms_all')
		.get(bnbr_controller.get_all_br_info)
		.post(bnbr_controller.search_br)

	// comments
	app.route('/bathroom/:brId/comments')
		.get(bnbr_controller.get_comments)
		.put(bnbr_controller.post_a_comment)

	// Users
	app.route('/users/')
		.post(user_controller.register_user)
		.put(user_controller.login)
}
