'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Grado = mongoose.model('Grado');

var async = require('async');

/*//Variable para evitar el error de enviar varias respuestas
var resStatus = false;
*/

// routes restful for users
router.route('/')

/* GET request to all the users in db  */
.get(function(req, res) {
    Grado.find(function(err, data) {
        if (err) {
            return res.status(400).send({ err: 'Not found' });
        }
        return res.status(200).send(data);
    });

})


.post(function(req, res) {
    // Instanciamos objeto en memoria
    var grado = new Grado(req.body);
    // Lo guardamos en la BD
    grado.save(function(err, data) {
        if (err) {
            res.status(500).send({ error: err });
            return;
        }
        res.status(200).send(data);
    });
});

router.route('/:id')

.get(function(req, res) {
    Grado.findById(req.params.id, function(err,data){
        if(err){
            res.status(404).send({error:err});
            return;
        } 

        res.status(200).send(data);
    })
})

.put(function(req, res){
    var gradoObj = req.body;
    var options = {};
    //Si modificamos el campus 
    // para que no borre el objeto anterior si no añada.
    //Se haría enviando un parametro desde el front que indicara que hemos modificado ese punto.
    //Desde el front tratariamos ese parametro y llamaríamos a funciones distintas
    Grado.update({_id:req.params.id},{$set: gradoObj}, options, function(err,data){
        if(err){
            res.status(400).send(err);
            return;
        }
        return res.status(200).send(data);

    })
})

.delete(function(req, res){
  
    Grado.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            return res.send(400).send({ err: 'Grado not found' });

        }
        return res.status(200).send(data);
    })
});


router.route('/grados') 

.post(function(req, res) {

    var GradoToSend = [];
    async.each(req.body, function(data, cb) {
        Grado.findById(data, function(err, data) {
            if (err) {
                cb(err);
            }
            GradoToSend.push(data);
            cb();
        });


    }, function(err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
            // One of the iterations produced an error.
            // All processing will now stop.
            return res.send(500).send({ err: err });

        } else {
            return res.send(GradoToSend);
        }
    });

});


module.exports = router;
