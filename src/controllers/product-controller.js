'use strict';

const ValidationContract = require("../validators/fluent-validator"); //Importa o validador de campos
const repository = require("../respoitories/product-repository")
const contract = new ValidationContract(); // Setamos o objeto do contrato de validação dos campos

// ------------------------------------------ Metodos GET -----------------------------------

// Metodo de lisatgem de todos os produtos cadastrados no banco 
exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};

// Metodo de listagem de produto por meio da abreviacao
exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};

// Metodo de lisatgem de produto por meio do id do produto
exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById( req.params.id,);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};

// Metodo de lisatgem de produto por meio das tags 
exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tags);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};

// -------------------------------------------------------------------------------------------

// Metodo de inserção de produtos
exports.post = async(req, res, next) => {
    
    // Chamamos seus metodos de validação para os campos vindos do body 
    contract.hasMinLen(req.body.title, 3, "O titulo deve conter pelo menos 3 caracteres!")
    contract.hasMinLen(req.body.slug, 3, "O slug deve conter pelo menos 3 caracteres!")
    contract.hasMinLen(req.body.description, 3, "A descrição deve conter pelo menos 3 caracteres!")

    // Se os dados forem invalidos ele retorna erro e encerra o metodo
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {     
        await repository.create(req.body)
        res.status(201).send({ message : "Produto cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};

// Metodo para atualizar os dados do produto pelo id    
exports.put = async(req, res, next) => {
    try {
        await repository.updateProduct(req.params.id, req.body)
        res.status(201).send({
            message : "Produto atualizado com sucesso!"
        });
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });  
    };
};

// Metodo para excluir o produto por id 
exports.delete = async(req, res, next) => {
    try {
        await repository.deleteProduct(req.params.id)
        res.status(200).send({
            message : "Produto removido com sucesso!"
        });
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });  
    }
    
};