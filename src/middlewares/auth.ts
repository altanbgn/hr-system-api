import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getEnv, createResponse } from '../utils'

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization');
  
    if (!token) {
      res.status(401).send(createResponse(401, 'Access denied! No token provided.'))
      return;
    }
  
    const result = verify(token, getEnv({ name: 'JWT_TOKEN_SECRET' }));
  
    if (result) {
      next();
      return;
    } else {
      res.status(400).send(createResponse(400, 'Invalid token!'));
      return;
    }
  } catch (error: any) {
    next(error);
  }
}