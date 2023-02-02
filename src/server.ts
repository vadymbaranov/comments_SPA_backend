import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';
import axios from 'axios';
import { EventEmitter } from 'events';
import { messagesRouter } from './routes/messagesRouter';

dotenv.config();

const router = express.Router();
const app = express();
const API_PATH = '/.netlify/functions/server';
const emitter = new EventEmitter();

app.use(express.json());
app.use(cors());
app.use(`${API_PATH}/messages`, messagesRouter);
app.use('/', router);

router.get('/', (req, res) => {
  res.json({
    hello: '123',
  });
});

app.post('/post', async(req, res) => {
  const { token } = req.body;

  await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${token}`,
  );

  if (res.status(200)) {
    res.send('Human');
  } else {
    res.send('Robot');
  }
});

export const handler = serverless(app);
