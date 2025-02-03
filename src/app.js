'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config.js");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generateSchemas = require('./schemas.js');
const path = require('path');

const app = express();

// Conexão ao banco
mongoose.connect(config.connectionString);

// Carrega as models
const Product = require("./models/product.js");
const Customer = require("./models/customer.js");
const Order = require("./models/order.js");

// Carrega rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route.js");
const customerRoute = require("./routes/customer-route.js");
const orderRoute = require("./routes/order-route.js");
const authenticateRoute = require("./routes/authenticate-route.js");

// Configuração do Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Documentação API-LevelUp",
        version: "1.0.0",
        description: "Documentação da API criada em Node.js para controle e venda de produtos eletrônicos de uma loja"
    },
    servers: [
        {
            url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
            description: 'API Server'
        }
    ],
    components: {
        securitySchemes: {
            xAccessToken: {
                type: "apiKey",
                in: "header",
                name: "x-access-token",
                description: "Insira seu token JWT no cabeçalho 'x-access-token'."
            }
        },
        schemas: generateSchemas()
    },
    security: [
        {
            xAccessToken: []
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "API LevelUp - Documentação"
}));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// Rotas da API
app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);
app.use("/authenticate", authenticateRoute);

module.exports = app;
