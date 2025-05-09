import mongoose from 'mongoose';
import { DB_URL } from '../config'

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(DB_URL);
    console.log("-".repeat(50));
    console.log('✅ Conectado ao MongoDB');
    console.log("-".repeat(50));
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    console.log("-".repeat(50));
    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log('✋ Desconectado do MongoDB');
  console.log("-".repeat(50));
}