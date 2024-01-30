'use strict';

const express =  require("express");
const router = express.Router();
const controller = require("../controllers/customer-controller");

// ------------------------------------------ Metodos GET -----------------------------------
router.get("/", controller.get); // Chama o metodo get do controler de produtos
// -------------------------------------------------------------------------------------------
router.post("/", controller.post); // Chama o metodo post do controller de produtos

module.exports = router; // Exporta para o uso dentro do app