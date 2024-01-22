'use strict';

const mongoose = require("mongoose"); // Chama o banco 
const Product = mongoose.model("Product"); // Seta o objeto do esquema do banco para ser manipulado 

// Metodo de lisatgem de todos os produtos cadastrados no banco 
exports.get = (req, res, next) => {
    Product.find({active : true}, "title price slug ") // Como se fosse um where, busca os produtos que estão ativos e exibe somente o title price e slug 
    .then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(400).send(error);
    });
}

// Metodo de inserção de produtos
exports.post = (req, res, next) => {
    var product = new Product(req.body); // seta o objeto do esquema para ser inserido dentro do banco 
    product.save()
    .then(success => {
        res.status(201).send({ message : "Produto cadastrado com sucesso!"});
    }).catch(error => {
        res.status(400).send({ message : "Erro ao cadastrar produto", data : error});
    });
};

// Metodo para atualizar os dados dos produtos
exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item : req.body
    }); 
};

// Metodo para excluir o produto
exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};