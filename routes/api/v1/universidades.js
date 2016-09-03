'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Universidad = mongoose.model('Universidad');
var Campus = mongoose.model('Campus');
var Grados = mongoose.model('Grado');


/*//Variable para evitar el error de enviar varias respuestas
var resStatus = false;
*/

// routes restful for users
router.route('/')

/* GET request to all the users in db  */
.get(function(req, res) {
    Universidad.find(function(err, data) {
        if (err) {
            return res.status(400).send({ err: 'Not found' });
        }
        return res.status(200).send(data);
    });

})


.post(function(req, res) {
    // Instanciamos objeto en memoria
    var universidad = new Universidad(req.body);
    // Lo guardamos en la BD
    universidad.save(function(err, data) {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        res.status(200).send(data);
    });
});


router.route('/:id')

.get(function(req, res) {
    Universidad.findById(req.params.id, function(err,data){
        if(err){
            res.status(404).send({error:err});
            return;
        } 

        res.status(200).send(data);
    })
})

.put(function(req, res){
    var universidadObj = req.body;
    var options = {};
    //Si modificamos el campus 
    // para que no borre el objeto anterior si no añada.
    //Se haría enviando un parametro desde el front que indicara que hemos modificado ese punto.
    //Desde el front tratariamos ese parametro y llamaríamos a funciones distintas
    Universidad.update({_id:req.params.id},{$set: universidadObj}, options, function(err,data){
        if(err){
            res.status(400).send(err);
            return;
        }
        return res.status(200).send(data);

    })
})

.delete(function(req, res){
  
    Universidad.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            return res.send(400).send({ err: 'Universidad not found' });

        }
        return res.status(200).send(data);
    })
});


module.exports = router;
