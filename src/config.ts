import dotenv from 'dotenv';

dotenv.config();

// Configurações principais
const config = {
  // Configurações do servidor
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },

  // Configurações de banco de dados
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/minha-api',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // Autenticação/JWT
  auth: {
    secret: process.env.JWT_SECRET || 'segredo-desenvolvimento',
    expiresIn: '24h',
  },

  // Outras configurações
  api: {
    prefix: '/api/v1',
  },
};

// Exportações individuais para conveniência
export const PORT = config.server.port;
export const NODE_ENV = config.server.env;
export const DB_URL = config.database.url;
export const JWT_SECRET = config.auth.secret;
export const API_PREFIX = config.api.prefix;

export default config;