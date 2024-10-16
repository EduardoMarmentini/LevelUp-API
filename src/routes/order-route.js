'use strict';

const express =  require("express");
const router = express.Router();
const controller = require("../controllers/order-controller");
const authService = require("../services/auth-service");

// ------------------------------------------ Metodos GET -----------------------------------
router.get("/", authService.authorize, controller.get); // Chama o metodo get do controler de produtos
// -------------------------------------------------------------------------------------------
router.post("/", authService.authorize, controller.post); // Chama o metodo post do controller de produtos

module.exports = router; // Exporta para o uso dentro do app