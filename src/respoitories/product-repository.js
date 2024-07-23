'use strict';

const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.get = async() =>{
    const res = await Product.find({
        // Aqui seria como uma condicional para os dados serem puxados, utilizando o mongoose para isso
        active : true 
    }, "title price slug photo");
    return res;
}

exports.getBySlug = async(slug) => {
    const res = await Product.findOne({
            slug : slug,
            active : true
        }, "title descripiton price slug tags"
    );
    return res;
}

exports.getById = async(id) => {
    const res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    const res = await Product.find({
            tags : tag,
            active : true
        }, "title description price slug tags"
    );
    return res;
}

exports.create = async(data) => {
    var product = new Product(data); // seta o objeto do esquema para ser inserido dentro do banco 
    await product.save()
}

exports.updateProduct = async(id, data) => {
    await Product.findByIdAndUpdate(
        id,
        {
            $set : {
                photo: data.photo,
                title : data.title,
                description : data.description,
                slug : data.slug,
                price : data.price
            }
        }
    );
}

exports.deleteProduct = async(id) => {
    await Product.findByIdAndDelete(id);
}