/* eslint-disable no-shadow */
import { Request, Response } from 'express';
import { MessageType } from 'src/types/MessageType';
import { getAllMessages, addOneMessage } from '../services/messages';

export const getAll = async(req: Request, res: Response) => {
  const messages = await getAllMessages();

  const messagesSorted = messages
    .map((message: MessageType) => (
      { ...message, createdAt: new Date(message.createdAt) }))
    .sort((messageA: MessageType, messageB: MessageType) => (
      Number(messageB.createdAt) - Number(messageA.createdAt)));

  res.json(messagesSorted);
};

export const addOne = async(req: Request, res: Response) => {
  const {
    username,
    email,
    homepage,
    messageText,
    responseTo,
  } = req.body;

  if (typeof username !== 'string'
    || typeof email !== 'string'
    || typeof homepage !== 'string'
    || typeof messageText !== 'string'
    || typeof responseTo !== 'string'
    || Object.keys(req.body).length < 5
  ) {
    res.sendStatus(400);

    return;
  }

  const newMessage = addOneMessage(req.body);

  res.statusCode = 201;
  res.send(newMessage);
};

// export const getOne = async (req: Request, res: Response) => {
//   const { goodId } = req.params;
//   const foundGood = await goodsService.getGoodById(+goodId);

//   if (!foundGood) {
//     res.sendStatus(404);
//     return;
//   }

//   res.send(foundGood);
// }

// export const add = async (req: Request, res: Response) => {
//   const { name, colorId } = req.body;

//   if (!name || !colorId) {
//     res.sendStatus(422);
//     return;
//   }

//   const newGood = await goodsService.addGood(name, colorId);

//   res.statusCode = 201;
//   res.json(newGood);
// }

// export const remove = async (req: Request, res: Response) => {
//   const { goodId } = req.params;
//   const foundGood = await goodsService.getGoodById(+goodId);

//   if (!foundGood) {
//     res.sendStatus(404);
//     return;
//   }

//   await goodsService.removeGood(+goodId);
//   res.sendStatus(204);
// }
