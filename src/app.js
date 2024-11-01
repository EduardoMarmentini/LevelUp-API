'use strict';

const express =  require("express");
const bodyParser = require("body-parser");  
const  mongoose  =  require("mongoose");
const config = require("./config.js")

const app =  express();

// Conexao ao banco
mongoose.connect(config.connectionString);

// Carrega as models
const Product  = require("./models/product.js")
const Costumer = require("./models/customer.js")
const Order = require("./models/order.js")

// Carrega rotas
const indexRoute = require("./routes/index-route"); // Rota da pagina principal da api 
const productRoute = require("./routes/products-route.js") // Rota para os metodos de manipulação de produto 
const customerRoute = require("./routes/customer-route.js") // Rota para os metodos de manipulação de customer
const orderRoute = require("./routes/order-route.js") // Rota para os metodos de manipulação de order
const authenticateRoute = require("./routes/authenticate-route.js") // Rota para o metodo de autenticação da API

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Hbilita CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
})

app.use("/", indexRoute);   
app.use("/products", productRoute);
app.use("/customers", customerRoute);
app.use("/orders", orderRoute);
app.use("/authenticate", authenticateRoute)

module.exports = app; 