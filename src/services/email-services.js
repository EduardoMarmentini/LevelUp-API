"use strict";

var config = require("../config");
var nodemailer = require("nodemailer")

exports.send = async (to, subject, body) => {
    // Configuração do transporte para o Gmail
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.gmail.user,
            pass: config.gmail.keypass
        }
    });

    // Opções do e-mail
    var mailOptions = {
        from: config.gmail.user,
        to: to,
        subject: subject,
        html: body
    };

    // Enviar e-mail
    transporter.sendMail(mailOptions);
};