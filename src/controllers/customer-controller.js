'use strict';

const ValidationContract = require("../validators/fluent-validator"); //Importa o validador de campos
const repository = require("../respoitories/customer-repository") //Chama o repositorio com os metodos
const contract = new ValidationContract(); // Setamos o objeto do contrato de validação dos campos
const md5 = require("md5"); // Hash de cripitografia de senha
const emailService = require("../services/email-services"); //Chama o service de envio de email
const authService = require("../services/auth-service"); //Aqui chamo o service que ira gerar o token de autenticação do usuario.

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
        await repository.create({
            name : req.body.name,
            email : req.body.email,
            password : md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        })

        emailService.send(
            req.body.email, 
            "Bem vindo ao Node Store",
            global.EMAIL_TMPL.replace("{0}", req.body.name)
        );

        res.status(201).send({ message : "Cliente cadastrado com sucesso!"});
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requiscão ",
            error : error
        });
    };
};