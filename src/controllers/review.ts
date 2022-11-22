import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { ReviewServices } from '../services';
import { createResponse } from '../utils';

export default class ReviewController {
  public static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await ReviewServices.getOne(req.params.id);

      res.status(200).send(createResponse(200, 'Request successful!', result))
    } catch (error: any) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await ReviewServices.getAll(req.query);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }
  
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header('Authorization') || '';
      const tokenData: any = decode(token);

      const result: any = await ReviewServices.create(tokenData.user._id, req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header('Authorization') || '';
      const tokenData: any = decode(token);

      // Checks if review exists
      await ReviewServices.getOne(req.params.id);

      // Updates review
      const result: any = await ReviewServices.update(req.params.id, tokenData.user._id, req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      // Checks if review exists
      await ReviewServices.getOne(req.params.id);

      // Deletes review
      const result: any = await ReviewServices.delete(req.params.id);
  
      if (result)
        res.status(200).send(createResponse(200, 'Request successful!'));
    } catch (error: any) {
      next(error);
    }
  }
}