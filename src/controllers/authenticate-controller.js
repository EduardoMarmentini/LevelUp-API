'use strict';

const repository = require("../respoitories/customer-repository") //Chama o repositorio com os metodos
const authService = require("../services/auth-service"); //Aqui chamo o service que ira gerar o token de autenticação do usuario.
const md5 = require('md5');

exports.authenticate = async(req, res, next) => {
    try {     
        const customer = await repository.authenticate({
            email : req.body.email,
            password : md5(req.body.password + global.SALT_KEY)
        })

        if(!customer){
            res.status(404).send({
                massege : "Usuário ou senha inválidos"
            });
            return
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requisção ",
            error : error
        });
    };
};

exports.refreshToken = async(req, res, next) => {
    try {     

        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = await authService.decodeToken(token)
            
        const customer = await repository.getById(data.id)

        if(!customer){
            res.status(404).send({
                massege : "Cliente não encontrado"
            });
            return
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message : "Falha ao processar sua requisção ",
            error : error
        });
    };
};