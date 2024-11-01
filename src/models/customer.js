"use strict";

const { string, required } = require("joi");
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
    },
    roles: {
        type: String,
        required : true,
        enum : ["user", "admin"],
        default: "user"
    }
});

module.exports = mongoose.model("Customer", schema); // Exporta para ser carregado no app