"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//plugin para cambiar el ObjectId por Number
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose);

//Esquema de las Campus
var CampusSchema = new Schema({
    nombre: String,
    grados_id: Array
});

//inicializamos el id a 1
CampusSchema.plugin(autoIncrement.plugin, { 
    model: 'Campus', 
    startAt: 1, 
});
var Campus = mongoose.model('Campus', CampusSchema);
