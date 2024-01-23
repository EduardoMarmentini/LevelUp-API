'use strict';

const express =  require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");

// ------------------------------------------ Metodos GET -----------------------------------

router.get("/", controller.get); // Chama o metodo get do controler de produtos
router.get("/find/slug/:slug", controller.getBySlug); // Chama o metodo get do controler de produtos
router.get("/find/:id", controller.getById); // Chama o metodo get do controler de produtos
router.get("/find/tags/:tags", controller.getByTag); // Chama o metodo get do controler de produtos

// -------------------------------------------------------------------------------------------

router.post("/", controller.post); // Chama o metodo post do controller de produtos
router.put("/:id", controller.put); // Chama o metodo put do controller de produtos
router.delete("/:id", controller.delete); // Chama o metodo delete do controler de produttos

module.exports = router; // Exporta para o uso dentro do app