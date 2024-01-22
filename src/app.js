'use strict';

const express =  require("express");
const bodyParser = require("body-parser");  
const  mongoose  =  require("mongoose");

const app =  express();
const router = express.Router();

// Conexao ao banco
mongoose.connect("mongodb+srv://root:Master2208@nodestore.ayfnqxx.mongodb.net/?retryWrites=true&w=majority")

// Carrega as models
const Product = require("./models/product.js")

// Carrega rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/products-route.js")  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }))
app.use("/", indexRoute);
app.use("/products", productRoute);""

module.exports = app;