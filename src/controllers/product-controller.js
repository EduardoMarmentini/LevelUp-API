'use strict';

const mongoose = require("mongoose"); // Chama o banco 
const Product = mongoose.model("Product"); // Seta o objeto do esquema do banco para ser manipulado 
const ValidationContract = require("../validators/fluent-validator"); //Importa o validador de campos
const repository = require("../respoitories/product-repository")
const contract = new ValidationContract(); // Setamos o objeto do contrato de validação dos campos

// ------------------------------------------ Metodos GET -----------------------------------

// Metodo de lisatgem de todos os produtos cadastrados no banco 
exports.get = (req, res, next) => {
    repository // Chamamos nosso repositorio que contem todos os metodos de busca no banco de dados
        .get()
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// Metodo de lisatgem de produto por meio da abreviacao
exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// Metodo de lisatgem de produto por meio do id do produto
exports.getById = (req, res, next) => {
    repository
        .getById( req.params.id,)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// Metodo de lisatgem de produto por meio das tags 
exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tags)
        .then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
}

// -------------------------------------------------------------------------------------------

// Metodo de inserção de produtos
exports.post = (req, res, next) => {
    
    // Chamamos seus metodos de validação para os campos vindos do body 
    contract.hasMinLen(req.body.title, 3, "O titulo deve conter pelo menos 3 caracteres!")
    contract.hasMinLen(req.body.slug, 3, "O slug deve conter pelo menos 3 caracteres!")
    contract.hasMinLen(req.body.description, 3, "A descrição deve conter pelo menos 3 caracteres!")

    // Se os dados forem invalidos ele retorna erro e encerra o metodo
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

   repository
        .create(req.body)
        .then(success => {
            res.status(201).send({ message : "Produto cadastrado com sucesso!"});
        }).catch(error => {
            res.status(400).send({ message : "Erro ao cadastrar produto", data : error});
        });
};

// Metodo para atualizar os dados do produto pelo id
exports.put = (req, res, next) => {
    repository
        .updateProduct(req.params.id, req.body)
        .then(success => {
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
    repository
        .deleteProduct(req.params.id)
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