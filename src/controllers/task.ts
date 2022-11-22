import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { TaskServices } from '../services';
import { createResponse } from '../utils';

export default class TaskController {
  public static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await TaskServices.getOne(req.params.id);

      res.status(200).send(createResponse(200, 'Request successful!', result))
    } catch (error: any) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await TaskServices.getAll(req.query);
  
      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }
  
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header('Authorization') || '';
      const tokenData: any = decode(token);

      const result: any = await TaskServices.create(tokenData.user._id, req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header('Authorization') || '';
      const tokenData: any = decode(token);

      // Checks if task exists
      await TaskServices.getOne(req.params.id);

      // Updates task
      const result: any = await TaskServices.update(req.params.id, tokenData.user._id, req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      // Checks if task exists
      await TaskServices.getOne(req.params.id);

      // Deletes task
      const result: any = await TaskServices.delete(req.params.id);
  
      if (result)
        res.status(200).send(createResponse(200, 'Request successful!'));
    } catch (error: any) {
      next(error);
    }
  }
}