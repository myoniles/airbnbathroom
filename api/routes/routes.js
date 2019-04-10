'use strict';

module.exports = function(app) {
	var bnbr_controller = require('../controllers/brController')

	app.route('/bathrooms:brId')
		.get(bnbr_controller.get_br_info);

}
