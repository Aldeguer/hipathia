'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hypathia');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connection error:'));
db.once('open', function() {
	console.info('Connected to mongodb on port 27017');
});


module.exports = mongoose;