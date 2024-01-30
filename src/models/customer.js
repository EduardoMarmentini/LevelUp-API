"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Seta o esquema da "table" do banco 

// Seta o esquema como se fosse um espelho do banco de dados da model de produtos 
const schema = new Schema({ 
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String, 
        required : true
    },
    password: {
        type : String, 
        required : true
    }
});
 
module.exports = mongoose.model("Customer", schema); // Exporta para ser carregado no app