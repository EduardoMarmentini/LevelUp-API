'use strict';

const express =  require("express");
const bodyParser = require("body-parser");  
const  mongoose  =  require("mongoose");

const app =  express();

// Conexao ao banco
mongoose.connect("mongodb+srv://root:Master2208@nodestore.ayfnqxx.mongodb.net/nodestore?retryWrites=true&w=majority");


// Carrega as models
const Product  = require("./models/product.js")
const Costumer = require("./models/costumer.js")
const Order = require("./models/order.js")

// Carrega rotas
const indexRoute = require("./routes/index-route"); // Rota da pagina principal da api 
const productRoute = require("./routes/products-route.js") // Rota para os metodos de manipulação de produto 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended : false 
}));

app.use("/", indexRoute);
app.use("/products", productRoute);""

module.exports = app; 