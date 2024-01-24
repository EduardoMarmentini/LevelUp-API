'use strict';

const mongoose = require("mongoose");
const Product = mongoose.model("Product");


exports.get = () =>{
    return Product
            .find(
                {active : true}, // Aqui seria como uma condicional para os dados serem puxados, utilizando o mongoose para isso
                "title price slug"
            );
}

