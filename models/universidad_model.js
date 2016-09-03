"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//plugin para cambiar el ObjectId por Number
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

//Esquema de las asignaturas
var UniversidadSchema = new Schema({
    nombre: String,
    campus_id: Array
});

//inicializamos el id a 1
UniversidadSchema.plugin(autoIncrement.plugin, { 
    model: 'Universidad', 
    startAt: 1, 
});
var Universidad = mongoose.model('Universidad', UniversidadSchema);

