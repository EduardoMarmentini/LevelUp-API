'use strict';

/**
 * @swagger
 * tags:
 *   - name: Home
 *     description: Rota principal da API
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Home]
 *     summary: Retorna informações sobre a API
 *     responses:
 *       200:
 *         description: Informações sobre a API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Node Store API
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send(
        { 
            title: "Node Store API", 
            version: "1.0.0" 
        }
    );
});

module.exports = router;
