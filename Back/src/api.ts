import { Router } from 'express';
import { Config } from './interfaces/Config';

const app = Router();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/date', (req, res) => {
  res.json({
    date: new Date(),
  });
});

app.get('/config', (req, res) => {
  const config: Config = {
    samples: Math.random() * 100,
    multiplicationFactor: Math.random() * 100,
  };
  res.json(config);
});

export const api = app;
