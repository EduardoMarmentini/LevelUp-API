'use strict';

const express = require("express");
const router = express.Router();
const controller = require("../controllers/product-controller");
const authService = require("../services/auth-service");

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operações relacionadas aos produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Retorna uma lista de produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/", controller.get); // Chama o metodo get do controller de produtos

/**
 * @swagger
 * /products/slug/{slug}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna um produto pelo slug
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: Slug do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 price:
 *                   type: number
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Produto não encontrado
 */
router.get("/slug/:slug", controller.getBySlug);

/**
 * @swagger
 * /products/find/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna um produto pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 price:
 *                   type: number
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Produto não encontrado
 */
router.get("/find/:id", controller.getById);

/**
 * @swagger
 * /products/tags/{tags}:
 *   get:
 *     tags: [Products]
 *     summary: Retorna produtos filtrados por tags
 *     parameters:
 *       - name: tags
 *         in: path
 *         required: true
 *         description: Tags para filtrar produtos
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de produtos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   price:
 *                     type: number
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/tags/:tags", controller.getByTag);

// ------------------------------------------ Metodos POST, PUT e DELETE ----------------------------------- 

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Adiciona um novo produto
 *     security:
 *       - xAccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nome do produto
 *               description:
 *                 type: string
 *                 description: Descrição do produto
 *               slug:
 *                 type: string
 *                 description: Slug do produto, usado em URLs
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *               active:
 *                 type: boolean
 *                 description: Indica se o produto está ativo
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de tags associadas ao produto
 *               photo:
 *                 type: string
 *                 description: Foto do produto em base64
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro ao criar o produto
 */
router.post("/", authService.isAdmin, controller.post);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Atualiza um produto existente
 *     security:
 *       - xAccessToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Nome do produto
 *               description:
 *                 type: string
 *                 description: Descrição do produto
 *               slug:
 *                 type: string
 *                 description: Slug do produto, usado em URLs
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *               active:
 *                 type: boolean
 *                 description: Indica se o produto está ativo
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de tags associadas ao produto
 *               photo:
 *                 type: string
 *                 description: URL da foto do produto (opcional)
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       400:
 *         description: Erro ao atualizar o produto
 */
router.put("/:id", authService.isAdmin, controller.put);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Remove um produto existente
 *     security:
 *       - xAccessToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do produto a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", authService.isAdmin, controller.delete); 

module.exports = router; // Exporta para o uso dentro do app