'use strict';

const express = require("express");
const router = express.Router();
const controller = require("../controllers/customer-controller");

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Rotas de manipulação dos customers
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     tags: [Customer]
 *     summary: Obtém a lista de clientes
 *     description: Retorna todos os clientes cadastrados no sistema
 *     responses:
 *       200:
 *         description: Lista de clientes obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get("/", controller.get); // Chama o metodo get do controller de produtos

/**
 * @swagger
 * /customers:
 *   post:
 *     tags: [Customer]
 *     summary: Adiciona um novo cliente
 *     description: Cria um novo cliente no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
*                type: object
*                properties:
*                   name:
*                     type: string
*                     description: Nome do cliente
*                     example: "Ronaldo Fenomeno"
*                   email:
*                     type: string
*                     description: E-mail do cliente
*                     example: "ofenomenal@outlook.com"
*                   password:
*                     type: string
*                     description: senha
*                     example: "Senha1234"
 *             
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro nos dados fornecidos
 */
router.post("/", controller.post); // Chama o metodo post do controller de produtos

module.exports = router; // Exporta para o uso dentro do app