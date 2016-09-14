var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// mongoose connection
require('./config/connectMongoose.js');


// Modelos
require('./models/asignatura_model');
/*require('./models/dia_model');
require('./models/horario_model');*/
require('./models/grado_model');
require('./models/universidad_model');
require('./models/campus_model');


// Rutas de API V1
var asignaturas = require('./routes/api/v1/asignaturas');
/*var horarios = require('./routes/api/v1/horarios');
var dias = require('./routes/api/v1/dias');*/
var grados = require('./routes/api/v1/grados');
var universidades = require('./routes/api/v1/universidades');
var campus = require('./routes/api/v1/campus');
var contacto = require('./routes/api/v1/contacto');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas de web


//Rutas de API V1
app.use('/api/v1/asignaturas', asignaturas);
/*app.use('/api/v1/horarios', horarios);
app.use('/api/v1/dias', dias);*/
app.use('/api/v1/grados', grados);
app.use('/api/v1/universidades', universidades);
app.use('/api/v1/campus', campus);
app.use('/api/v1/contacto', contacto);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
