'use strict';

const repository = require("../respoitories/order-repository") //Chama o repositorio com os metodos
const guid = require("guid");

// Metodo de lisatgem de todos os customers cadastrados no banco 
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


exports.post = async(req, res, next) => {
    try {     
        await repository.create({
            customer: req.body.customer,
            number : guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({ message : "Pedido cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};