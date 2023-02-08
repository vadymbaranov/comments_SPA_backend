// eslint-disable-next-line no-shadow
import { Request, Response, NextFunction } from 'express';
import { MessageType } from 'src/types/MessageType';

interface Result {
  next?: {
    page: number,
    limit: number,
  },
  previous?: {
    page: number,
    limit: number,
  },
  results?: MessageType[],
  totalPages?: number,
  currentPage?: number,
}

export interface RequestWithResult extends Request {
  paginatedResult: Result;
}

export function paginatedComments(comments: MessageType[] | null) {
  return (req: RequestWithResult, res: Response, next: NextFunction) => {
    try {
      if (comments === null) {
        return res.status(404).send('Error, no messages!');
      }

      let {
        page = 1,
        limit = 25,
      } = req.query;

      page = Number(page);
      limit = Number(limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const count = comments.length;

      const result: Result = {};

      if (endIndex < comments.length) {
        result.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit,
        };
      }

      result.results = comments.slice(startIndex, endIndex);

      result.totalPages = Math.ceil(count / limit);
      result.currentPage = page;

      req.paginatedResult = result;

      next();
    } catch (err: any) {
      return res.status(404).send(err.message);
    }
  };
};
