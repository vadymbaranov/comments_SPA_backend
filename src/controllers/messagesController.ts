/* eslint-disable no-shadow */
import { Request, Response } from 'express';
// import { RequestWithResult } from 'src/modules/paginatedComments';
import { Query } from 'src/types/Query';
import { MessageType } from 'src/types/MessageType';
import { Results } from 'src/types/Results';
import { getAllMessages, addOneMessage } from '../services/messages';

export const getAll = async(req: Request, res: Response) => {
  const messages = await getAllMessages();

  if (!messages) {
    res.sendStatus(404);

    return;
  }

  const messagesSorted = messages
    .map((message: MessageType) => (
      { ...message, createdAt: new Date(message.createdAt) }))
    .sort((messageA: MessageType, messageB: MessageType) => (
      Number(messageB.createdAt) - Number(messageA.createdAt)));

  let { page, limit } = req.query as Query;

  if (!page && !limit && messages) {
    limit = messages.length;
  }

  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 25;
  }

  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);
  const results: Results = {
    results: messagesSorted,
  };

  if (messagesSorted && endIndex < messagesSorted.length) {
    results.next = {
      page: Number(page) + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: Number(page) - 1,
      limit,
    };
  }

  if (messagesSorted) {
    results.results = messagesSorted.slice(startIndex, endIndex);
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(results);
};

export const addOne = async(req: Request, res: Response) => {
  const {
    username,
    email,
    homepage,
    messageText,
  } = req.body;

  // if (typeof username !== 'string'
  //   || typeof email !== 'string'
  //   || typeof homepage !== 'string'
  //   || typeof messageText !== 'string'
  //   || Object.keys(req.body).length < 4
  // ) {
  //   res.sendStatus(400);

  //   return;
  // }

  const newMessage = addOneMessage(req.body);

  res.statusCode = 201;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Token');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
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
