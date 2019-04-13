var express = require('express'),
	app = express(),
	port = 3000
	mongoose = require('mongoose')
	Br_model = require('./api/models/brModel')
	bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/airbnbr', { useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/routes')
routes(app)

app.listen(port);

console.log('API launched on port' + port)
