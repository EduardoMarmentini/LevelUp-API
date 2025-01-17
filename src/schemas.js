'use strict';

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Função para gerar os schemas a partir das models
const generateSchemas = () => {
    const schemas = {};
    const modelsPath = path.join(__dirname, "..", "src", "models");

    // Lê todas as files dentro da pasta de models
    fs.readdirSync(modelsPath).forEach(file => {
        if (file.endsWith('.js')) {
            try {
                const model = require(path.join(modelsPath, file));

                // Verifica se o objeto importado é um modelo válido do Mongoose
                if (model && model.modelName && model.schema) {
                    const modelName = model.modelName;

                    schemas[modelName] = {
                        type: "object",
                        properties: {}
                    };

                    // Itera pelas propriedades do schema
                    for (const key in model.schema.paths) {
                        const pathType = model.schema.paths[key];

                        // Ignora propriedades internas do Mongoose, como "_id" e "__v"
                        if (key === "_id" || key === "__v") continue;

                        const property = {
                            type: convertMongooseTypeToSwaggerType(pathType.instance)
                        };

                        // Adiciona `required` se a propriedade for obrigatória
                        if (pathType.options.required) {
                            property.required = true;
                        }

                        // Adiciona enum, se aplicável
                        if (pathType.enumValues && pathType.enumValues.length > 0) {
                            property.enum = pathType.enumValues;
                        }

                        schemas[modelName].properties[key] = property;
                    }
                } else {
                    console.error(`O arquivo ${file} não exporta um modelo Mongoose válido.`);
                }
            } catch (error) {
                console.error(`Erro ao carregar o modelo ${file}: ${error.message}`);
            }
        }
    });

    return schemas;
};

// Função para converter tipos do Mongoose em tipos do Swagger
const convertMongooseTypeToSwaggerType = (mongooseType) => {
    switch (mongooseType) {
        case "String":
            return "string";
        case "Number":
            return "number";
        case "Date":
            return "string"; // Swagger usa "string" para datas
        case "Boolean":
            return "boolean";
        case "Array":
            return "array"; // Arrays podem precisar de tratamento adicional
        case "ObjectId":
            return "string"; // Trata ObjectId como string no Swagger
        default:
            return "object";
    }
};

module.exports = generateSchemas;
