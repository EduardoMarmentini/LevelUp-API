'use strict';

const express =  require("express");
const router = express.Router();
const controller = require("../controllers/authenticate-controller");
const authService = require("../services/auth-service"); //Aqui chamo o service que ira gerar o token de autenticação do usuario.

router.post("/", controller.authenticate); // Chama o metodo de authenticação do controller de autenticação
router.post("/refresh-token", authService.authorize, controller.refreshToken); // Chama o metodo de authenticação do controller de autenticação


module.exports = router; // Exporta para o uso dentro do app