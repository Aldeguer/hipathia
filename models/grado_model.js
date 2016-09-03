"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//plugin para cambiar el ObjectId por Number
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

//Esquema de las asignaturas
var GradoSchema = new Schema({
    nombre: String,
    asignaturas_id:Array,
    campus_id: Array
});

//inicializamos el id a 1
GradoSchema.plugin(autoIncrement.plugin, { 
    model: 'Grado', 
    startAt: 1, 
});
var Grado = mongoose.model('Grado', GradoSchema);

