import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/Error';
import Token from '../utils/token.util';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') {
    throw new HttpException(401, 'Token not found');
  }
  const data = Token.tokenValidation(authorization);
  req.body.user = data;
  next();
};
