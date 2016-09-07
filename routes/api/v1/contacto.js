var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'mimerchante27@gmail.com',
        pass: 'm2i7r0i6a9m40276'
    }
}));
router.route('/')

.post(function(req, res) {
  console.log(req.body);
    var mailOptions = {
        to: req.body.email,
        subject: 'Hipathya Duda',
        from: 'mimerchante27@gmail.com',
        text: req.body.duda
    };
    transport.sendMail(mailOptions, function(err, info) {
        if (err) {
            return res.status(400).send({ err: 'Not found' });
        } 

        return res.status(200).send(info);
    });
});

module.exports = router;

