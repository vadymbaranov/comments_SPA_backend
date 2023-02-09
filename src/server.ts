import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
// import { EventEmitter } from 'events';
// import { WebSocketServer } from 'ws';
import { messagesRouter } from './routes/messagesRouter';

dotenv.config();

const router = express.Router();
const app = express();
const API_PATH = '/.netlify/functions/server';

// const server = app.listen(9000);
// const emitter = new EventEmitter();
// const wss = new WebSocketServer({ server });

// emitter.on('message', message => {
//   for (const client of wss.clients) {
//     client.send(JSON.stringify(message));
//   }
// });
app.use(express.json());

app.use(cors({
  origin: '*',
}));
app.use(API_PATH, messagesRouter);
app.use('/', router);

router.get('/', (req, res) => {
  res.json({
    hello: '123',
  });
});

export const handler = serverless(app);
