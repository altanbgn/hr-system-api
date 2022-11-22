import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { UserServices } from '../services';
import { createResponse } from '../utils';

export default class UserController {
  public static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await UserServices.me(req.header('Authorization'));

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await UserServices.updateMe(req.header('Authorization'), req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await UserServices.changePassword(
        req.header('Authorization'),
        req.body.oldPassword,
        req.body.newPassword
      );

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await UserServices.getOne(req.params.id);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await UserServices.getAll(req.query)

      res.status(200).send(createResponse(200, 'Response successful!', result));
    } catch (error: any) {
      next(error);
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string = req.header('Authorization') || '';
      const tokenData: any = decode(token);

      // Checks if user exists
      await UserServices.getOne(req.params.id);

      // Updates user
      const result: any = await UserServices.update(req.params.id, tokenData.user._id, req.body);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch (error: any) {
      next(error)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      // Checks if user exists
      await UserServices.getOne(req.params.id);

      // Deletes user
      await UserServices.delete(req.params.id);

      res.status(200).send(createResponse(200, 'Request successful!'));
    } catch (error: any) {
      next(error);
    }
  }
}