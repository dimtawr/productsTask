import { Request, Response, NextFunction } from 'express';

const respondWith = (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  res.respondWith = (data = {}, statusCode = 200) => {
    res.status(statusCode);
    return res.json({ errors: [], data });
  };
  next();
};

export default respondWith;
