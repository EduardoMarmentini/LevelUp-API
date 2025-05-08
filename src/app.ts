import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota básica de teste
app.get('/', (req: Request, res: Response) => {
  res.send('LevelUp API - Hello World!');
});

export default app;