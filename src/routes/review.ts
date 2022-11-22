import { Router } from 'express';
import { ReviewController } from '../controllers';
import { auth, validateObjectId } from '../middlewares';

export const reviewRouter = Router();

reviewRouter.route('/')
  .post(auth, ReviewController.create);

reviewRouter.route('/list')
  .get(auth, ReviewController.getAll);

reviewRouter.route('/:id')
  .get(auth, validateObjectId, ReviewController.getOne)
  .put(auth, validateObjectId, ReviewController.update)
  .delete(auth, validateObjectId, ReviewController.delete);