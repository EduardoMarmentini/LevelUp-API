'use strict';

const express =  require("express");
const router = express.Router();
const controller = require("../controllers/authenticate-controller");

router.post("/", controller.authenticate); // Chama o metodo de authenticação do controller de autenticação

module.exports = router; // Exporta para o uso dentro do app