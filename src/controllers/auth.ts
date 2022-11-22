import { Request, Response, NextFunction } from 'express';
import { AuthServices } from '../services';
import { createResponse } from '../utils';

export default class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await AuthServices.login(req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result))
    } catch (error) {
      next(error);
    }
  }

  public static async register (req: Request, res: Response, next: NextFunction) {
    try {
      await AuthServices.register(req.body);

      res.status(200).send(createResponse(200, 'Request successful!'))
    } catch (error) {
      next(error);
    }
  }
}