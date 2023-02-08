import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import fs from 'fs/promises';
import path from 'path';
import { Message } from '../models/messageModel';
// import { MessageType } from 'src/types/MessageType';

// eslint-disable-next-line max-len
// class Comment extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {

// }

// export function normalize(message: Message) {

//   return {
//     id,
//     createdAt,
//     username,
//     email,
//     homepage,
//     message,
//     image,
//     textFile,
//     responseTo,
//   };
// }

export async function getAllMessages() {
  const filePath = path.resolve('public/api', 'messages.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const parsedData = JSON.parse(data);

  return parsedData;
}

export async function getAllMessagesDB() {
  const result = await Message.findAll({
    order: [
      'created_at',
    ],
  });

  return result;
}

export async function addOneMessage(body: any) {
  const filePath = path.resolve('public/api', 'messages.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const parsedData = JSON.parse(data);
  const maxID = Math.max(...parsedData.map((message: any) => message.id));
  const createdAt = new Date();
  const { username, email, homepage, messageText, responseTo } = body;
  let newMessage;

  if (homepage === '' && responseTo === '') {
    newMessage = {
      id: maxID > 0 ? (maxID + 1) : 1,
      createdAt,
      username,
      email,
      homepage: 'NULL',
      messageText,
      responseTo: 'NULL',
    };
  } else if (responseTo === '') {
    newMessage = {
      id: maxID > 0 ? (maxID + 1) : 1,
      createdAt,
      ...body,
      responseTo: 'NULL',
    };
  } else if (homepage === '') {
    newMessage = {
      id: maxID > 0 ? (maxID + 1) : 1,
      createdAt,
      ...body,
      homepage: 'NULL',
    };
  } else {
    newMessage = {
      id: maxID > 0 ? (maxID + 1) : 1,
      createdAt,
      ...body,
    };
  }

  parsedData.push(newMessage);

  await fs.writeFile(filePath, JSON.stringify(parsedData));

  return newMessage;
}

// export const getAll = async() => {
//   return Good.findAll();
// };

// export const getGoodById = async(goodId: number) => {
//   return Good.findByPk(goodId);
// };

// export const addGood = async(name: string, colorId: number) => {
//   const newGood = {
//     name,
//     colorId,
//   };

//   return Good.create(newGood);
// };

// export const removeGood = async(goodId: number) => {
//   return Good.destroy({
//     where: {
//       id: goodId,
//     },
//   });
// };
