import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';

const errorHandler = () => (err: ApiError, req: Request, res: Response, _: NextFunction) => {
  console.error('error: ' + err.code + '\n' + err);

  const response = {
    errors: err.message,
    data: null,
  };
  res.status(err.code || 500);
  res.json(response);
  res.end();
};

export default errorHandler;
