var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.zoho.com',
    port: 465,
    auth: {
        user: 'info@academiahipathia.com',
        pass: 'Edurne12'
    }
}));
router.route('/')

.post(function(req, res) {
    console.log(req.body);
    var mailOptions = {
        from: 'info@academiahipathia.com',
        to: 'info@academiahipathia.com',
        subject: 'Hipathia Duda',
        text: 'Duda: ' + req.body.duda + '\n Nombre: ' + req.body.nombre + '\n Email: '+ req.body.email + '\n Telefono: ' + req.body.telefono
    };
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
            return res.status(400).send({ err: err });
        }

        return res.status(200).send(info);
    });
});

module.exports = router;
