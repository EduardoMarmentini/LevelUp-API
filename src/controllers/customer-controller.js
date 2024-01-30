'use strict';

const ValidationContract = require("../validators/fluent-validator"); //Importa o validador de campos
const repository = require("../respoitories/customer-repository") //Chama o repositorio com os metodos
const contract = new ValidationContract(); // Setamos o objeto do contrato de validação dos campos


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
    
    // Chamamos seus metodos de validação para os campos vindos do body 
    contract.hasMinLen(req.body.name, 3, "O nome deve conter pelo menos 3 caracteres!")
    contract.isEmail(req.body.email, "Insira um e-mail valido!")
    contract.hasMinLen(req.body.password, 6, "A senha deve conter pelo menos 6 caracteres!")

    // Se os dados forem invalidos ele retorna erro e encerra o metodo
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    };

    try {     
        await repository.create(req.body)
        res.status(201).send({ message : "Cliente cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};