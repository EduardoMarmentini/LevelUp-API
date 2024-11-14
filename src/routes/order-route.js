'use strict';

const express = require("express");
const router = express.Router();
const controller = require("../controllers/order-controller");
const authService = require("../services/auth-service");

/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Rotas para manipulação dos orders
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     xAccessToken: 
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 *       description: Insira seu token JWT no cabeçalho 'x-access-token'.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order]
 *     summary: Recupera a lista de pedidos
 *     description: Este endpoint retorna todos os pedidos disponíveis.
 *     security:
 *       - xAccessToken: []
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: O ID do pedido
 *                     example: "607d1c56b33d3a3e5cdd8e5d"
 *                   customerId:
 *                     type: string
 *                     description: O ID do cliente que fez o pedido
 *                     example: "607d1c56b33d3a3e5cdd8e5e"
 *                   total:
 *                     type: number
 *                     format: float
 *                     description: O total do pedido
 *                     example: 99.99
 *
 *   post:
 *     tags: [Order]
 *     summary: Cria um novo pedido
 *     description: Este endpoint cria um novo pedido com as informações fornecidas.
 *     security:
 *       - xAccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: O ID do cliente que faz o pedido
 *                 example: "607d1c56b33d3a3e5cdd8e5e"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: O ID do produto
 *                       example: "607d1c56b33d3a3e5cdd8e5a"
 *                     quantity:
 *                       type: string
 *                       description: A quantidade do produto
 *                       example: "2"
 *                     price:
 *                       type: string
 *                       description: Valor do produto
 *                       example: "19.99"
 *             required:
 *               - customerId
 *               - items
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   description: O ID do novo pedido
 *                   example: "607d1c56b33d3a3e5cdd8e5d"
 */

router.get("/", authService.authorize, controller.get); // Chama o metodo get do controller de pedidos
router.post("/", authService.authorize, controller.post); // Chama o metodo post do controller de pedidos

module.exports = router; // Exporta para o uso dentro do app
