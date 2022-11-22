import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import { FileServices } from '../services';
import { createResponse } from '../utils';

export default class FileController {
  public static async uploadMultiple(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await FileServices.uploadMultiple(req.files);

      res.status(200).send(createResponse(200, 'Request successful!', result)); 
    } catch(error) {
      if (error instanceof MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ error: { message: `Multer uploading error: ${error.message}` } }).end();
        return;
      } else if (error) {
          // An unknown error occurred when uploading.
          if (error.name == 'ExtensionError')
            res.status(413).send({ error: { message: error.message } }).end();
          else
            next(error);

          return;
      }
    }
  }

  public static async uploadSingle(req: Request, res: Response, next: NextFunction) {
    try {
      const result: any = await FileServices.uploadSingle(req.file);

      res.status(200).send(createResponse(200, 'Request successful!', result));
    } catch(error) {
      if (error instanceof MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ error: { message: `Multer uploading error: ${error.message}` } }).end();
        return;
      } else if (error) {
          // An unknown error occurred when uploading.
          if (error.name == 'ExtensionError')
            res.status(413).send({ error: { message: error.message } }).end();
          else
            next(error);

          return;
      }
    }
  }

  public static async deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
      await FileServices.deleteOne(req.params.filename);

      res.status(200).send(createResponse(200, 'Request successful!'));
    } catch(error) {
      next(error);
    }
  }
}
