"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//plugin para cambiar el ObjectId por Number
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

//Esquema de las asignaturas
var AsignaturaSchema = new Schema({
    nombre: String,
    cuatri: Number,
    intensivo: String,
    horarios: Array, //embebido 
    grados_id: Array
});

//inicializamos el id a 1
AsignaturaSchema.plugin(autoIncrement.plugin, { 
    model: 'Asignatura', 
    startAt: 1, 
});
var Asignatura = mongoose.model('Asignatura', AsignaturaSchema);

