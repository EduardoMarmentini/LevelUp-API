import app from './app';
import { connectDatabase, disconnectDatabase } from './database/connection';
import { PORT, API_PREFIX } from './config';

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log("-".repeat(50));
    console.log(`🌐 Rodando localmente http://localhost:${PORT}${API_PREFIX}`);
    console.log("-".repeat(50));
  });
});

// Trata desligamento gracioso
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});