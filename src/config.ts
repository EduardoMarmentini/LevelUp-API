import dotenv from 'dotenv';

dotenv.config();

// Configurações principais com valores padrão
const config = {
  // Configurações do servidor
  server: {
    port: Number(process.env.PORT) || 3000, // Converte para número e define padrão
    env: process.env.NODE_ENV || 'development',
  },

  // Configurações de banco de dados
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase',
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

// Exportações individuais com tipagem explícita
export const PORT: number = config.server.port;
export const NODE_ENV: string = config.server.env;
export const DB_URL: string = config.database.url;
export const JWT_SECRET: string = config.auth.secret;
export const API_PREFIX: string = config.api.prefix;

export default config;