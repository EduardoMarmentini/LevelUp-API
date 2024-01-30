"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Seta o esquema da "table" do banco 

// Seta o esquema como se fosse um espelho do banco de dados da model de produtos 
const schema = new Schema({ 
    number: {
        type : String,
        required : true,
    },
    customer: {
        type : mongoose.Schema.Types.ObjectId, 
        ref : "Customer"
    },
    createDate: {
        type : Date,
        required : true,
        default : Date.now
    },
    status: {
        type : String,
        required : true,
        enum : ["created", "done"],
        default : "created"
    },
    items: [{
        quantity: {
            type : Number,
            default : 1,
        },
        price : {
            type : Number,
            required : true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId, 
            ref : "Product"
        }
    }]
});
 
module.exports = mongoose.model("Order", schema); // Exporta para ser carregado no app