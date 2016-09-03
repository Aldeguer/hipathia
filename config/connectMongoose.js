'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_ngpn52ww:6l94gmsa35o04uhlii1u1i18l7@ds021016.mlab.com:21016/heroku_ngpn52ww'||'mongodb://localhost/hypathia');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongodb connection error:'));
db.once('open', function() {
	console.info('Connected to mongodb on port 27017');
});


module.exports = mongoose;