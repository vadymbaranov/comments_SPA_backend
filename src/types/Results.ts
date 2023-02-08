import { MessageType } from './MessageType';

export type Results = {
  results: MessageType[];
  next?: object;
  previous?: object;
}
