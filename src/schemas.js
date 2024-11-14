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
                
                // Verifica se o objeto importado tem a propriedade modelName
                if (model && model.modelName) {
                    const modelName = model.modelName
                    
                    schemas[modelName] = {
                        type: "object",
                        properties: {}
                    };

                    for (const key in model.schema.paths) {
                        const pathType = model.schema.paths[key];
                        schemas[modelName].properties[key] = {
                            type: pathType.instance.toLowerCase()
                        };

                        if (pathType.isRequired) {
                            schemas[modelName].properties[key].required = true;
                        }
                        if (pathType.enumValues && pathType.enumValues.length > 0) {
                            schemas[modelName].properties[key].enum = pathType.enumValues;
                        }
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

module.exports = generateSchemas;