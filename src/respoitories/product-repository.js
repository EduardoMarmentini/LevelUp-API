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

exports.getBySlug = (slug) => {
    return Product
        .findOne(
            {
            slug : slug,
            active : true
            }, 
            "title descripiton price slug tags"
        )
}

exports.getById = (id) => {
    return Product
        .findById(id)
}

exports.getByTag = (tag) => {
    return Product
        .find(
            {
                tags : tag,
                active : true
            },
            "title description price slug tags"
        )
}

exports.create = (data) => {
    var product = new Product(data); // seta o objeto do esquema para ser inserido dentro do banco 
    return product.save()
}

exports.updateProduct = (id, data) => {
    return Product
        .findByIdAndUpdate(id,
            {
                $set : {
                    title : data.title,
                    description : data.description,
                    slug : data.slug,
                    price : data.price
                }
            }
        )
}

exports.deleteProduct = (id) => {
    return Product
        .findByIdAndDelete(id)
}