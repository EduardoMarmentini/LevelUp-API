'use strict';

const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

exports.get = async() =>{
    const res = await Customer.find({},"name email");
    return res;
}

exports.create = async(data) => {
    var customer = new Customer(data); // seta o objeto do esquema para ser inserido dentro do banco 
    await customer.save()
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({
        email : data.email,
        password : data.password
    });
    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}