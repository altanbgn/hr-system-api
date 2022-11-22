import { Router } from 'express';
import multer from 'multer';
import { FileController } from '../controllers';
import { auth } from '../middlewares';
import { multerConfig } from '../utils';

export const fileRouter = Router();

fileRouter.route('/images')
  .post(auth, multer(multerConfig).single('images'), FileController.uploadMultiple)

fileRouter.route('/images/:filename')
  .delete(auth, FileController.deleteOne);