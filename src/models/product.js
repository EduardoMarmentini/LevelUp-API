"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Seta o esquema da "table" do banco 

// Seta o esquema como se fosse um espelho do banco de dados da model de produtos 
const schema = new Schema({ 
    title: {
        type : String,
        required : true,
        trim : true
    },
    slug : {
        type  : String,
        required : true,
        trim : true,
        indexe : true,
        unique : true
    },
    description : {
        type : String,
        required: true,
        trim: true
    },
    price : {
        type : Number,
        required : true,
    },
    active : {
        type : Boolean,
        required : true,
        default : true
    },
    tags : [{
        type: String,
        required : true
    }]
});
 
module.exports = mongoose.model("Product", schema); // Exporta para ser carregado no app