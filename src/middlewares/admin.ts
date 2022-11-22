import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getEnv, createResponse } from '../utils';

export function admin(req: Request, res: Response, next: NextFunction) {
  try { 
    const token = req.header('Authorization');
  
    if (!token) {
      res.status(401).send(createResponse(401, 'Access denied! No token provided.'))
      return;
    }
  
    try {
      const tokenData: any = verify(token, getEnv({ name: 'JWT_TOKEN_SECRET' }));
  
      if (tokenData.user.isAdmin) {
        next();
        return;
      }
      
      res.status(401).send(createResponse(401, 'Access denied!'))
      return;
    } catch(error) {
      res.status(400).send(createResponse(400, 'Invalid token!'))
      return;
    }
  } catch(error: any) {
    next(error);
  }
}