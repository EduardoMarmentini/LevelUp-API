'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config.js");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const generateSchemas = require('./schemas.js'); // Importando a função para gerar os schemas
const path = require('path');

const app = express();

// Conexão ao banco
mongoose.connect(config.connectionString);

// Carrega as models
const Product = require("./models/product.js");
const Customer = require("./models/customer.js");
const Order = require("./models/order.js");

// Carrega rotas
const indexRoute = require("./routes/index-route"); // Rota da página principal da API 
const productRoute = require("./routes/products-route.js"); // Rota para os métodos de manipulação de produto 
const customerRoute = require("./routes/customer-route.js"); // Rota para os métodos de manipulação de customer
const orderRoute = require("./routes/order-route.js"); // Rota para os métodos de manipulação de order
const authenticateRoute = require("./routes/authenticate-route.js"); // Rota para o método de autenticação da API

// Configuração do Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Documentação API-LevelUp",
        version: "1.0.0",
        description: "Documentação da API criada em Node.js para controle e venda de produtos eletrônicos de uma loja"
    },
    components: {
        securitySchemes: {
            xAccessToken: {  // Alterado para xAccessToken
                type: "apiKey",
                in: "header",
                name: "x-access-token", // Este é o nome do cabeçalho que você vai usar
                description: "Insira seu token JWT no cabeçalho 'x-access-token'."
            }
        },
        schemas: generateSchemas() // Gera os schemas a partir das models
    },
    security: [
        {
            xAccessToken: [] // Aplicar a segurança globalmente
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, './routes/*.js')], // Caminho completo para as rotas
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware para servir a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use("/", indexRoute);
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);
app.use("/authenticate", authenticateRoute);

module.exports = app;
