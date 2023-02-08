/* eslint-disable no-shadow */
import fs from 'fs/promises';
import path from 'path';
import { Message } from '../models/messageModel';
// import { MessageType } from 'src/types/MessageType';

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
      responseTo: 'NULL',
      ...body,
    };
  } else if (homepage === '') {
    newMessage = {
      id: maxID > 0 ? (maxID + 1) : 1,
      createdAt,
      homepage: 'NULL',
      ...body,
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

// export const addGood = async(name: string, colorId: number) => {
//   const newGood = {
//     name,
//     colorId,
//   };

//   return Good.create(newGood);
// };

