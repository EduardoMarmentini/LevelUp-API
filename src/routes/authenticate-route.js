'use strict';

const express =  require("express");
const router = express.Router();
const controller = require("../controllers/authenticate-controller");
const authService = require("../services/auth-service"); //Aqui chamo o service que ira gerar o token de autenticação do usuario.

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Operações relacionadas à autenticação de usuários
 */

/**
 * @swagger
 * /authenticate:
 *   post:
 *     tags: [Authentication]
 *     summary: Autentica um usuário e gera um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT que pode ser usado para autenticação em rotas protegidas
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/", controller.authenticate); // Chama o método de autenticação do controller de autenticação

/**
 * @swagger
 * /authenticate/refresh-token:
 *   post:
 *     tags: [Authentication]
 *     summary: Torna um token já gerado valido novamente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT expirado que deve ser renovado
 *     responses:
 *       200:
 *         description: Novo token JWT gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Novo token JWT que pode ser usado para autenticação em rotas protegidas
 *       401:
 *         description: Token inválido ou expirado
 */
router.post("/refresh-token", authService.authorize, controller.refreshToken); // Chama o método de autenticação do controller de autenticação

module.exports = router; // Exporta para o uso dentro do app