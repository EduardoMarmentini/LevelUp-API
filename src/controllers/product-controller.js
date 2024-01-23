'use strict';

const mongoose = require("mongoose"); // Chama o banco 
const Product = mongoose.model("Product"); // Seta o objeto do esquema do banco para ser manipulado 

// ------------------------------------------ Metodos GET -----------------------------------

// Metodo de lisatgem de todos os produtos cadastrados no banco 
exports.get = (req, res, next) => {
    Product
        // Como se fosse um where, busca os produtos que estão ativos e exibe somente o title price e slug 
        .find({active : true}, "title price slug ") .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// Metodo de lisatgem de produto por meio da abreviacao
exports.getBySlug = (req, res, next) => {
    Product.findOne(
        {
            slug : req.params.slug,
            active : true
        }, 
        "title descripiton price slug tags").then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(400).send(error);
    });
}

// Metodo de lisatgem de produto por meio do id do produto
exports.getById = (req, res, next) => {
    Product
        .findById( req.params.id,).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// Metodo de lisatgem de produto por meio das tags 
exports.getByTag = (req, res, next) => {
    Product
        .find(
            {
                tags : req.params.tags,
                active : true
            },
            "title description price slug tags"
        ).then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// -------------------------------------------------------------------------------------------

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

// Metodo para atualizar os dados do produto pelo id
exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id,
            {
                $set : {
                    title : req.body.title,
                    description : req.body.description,
                    slug : req.body.slug,
                    price : req.body.price
                }
            }
        ).then(success => {
            res.status(201).send({
                message : "Produto atualizado com sucesso!"
            });
        }).catch(error => {
            res.status(400).send({
                message : "Falha ao atualizar o produto",
                error : error
            });
        });
};

// Metodo para excluir o produto por id 
exports.delete = (req, res, next) => {
    Product
        .findByIdAndDelete(req.params.id)
        .then(success => {
            res.status(200).send({
                message : "Produto removido com sucesso!"
            });
        }).catch( error => {
            res.status(400).send({
                message : "Falha ao remover produto!",
                error : error
            });
        });
};