import express from 'express';
// import { MessageType } from 'src/types/MessageType';
// import { Message } from 'src/models/messageModel';
// import { paginatedComments } from 'src/modules/paginatedComments';
import { getAll, addOne } from '../controllers/messagesController';
// import { getAllMessagesDB } from 'src/services/messages';

export const messagesRouter = express.Router();

messagesRouter.get('/messages', getAll);

messagesRouter.post(
  '/messages',
  express.urlencoded({ extended: true }),
  addOne,
);
