import express from 'express';
import { getAll, addOne } from '../controllers/messagesController';

export const messagesRouter = express.Router();

messagesRouter.get('/', getAll);
messagesRouter.post('/', express.urlencoded({ extended: true }), addOne);
