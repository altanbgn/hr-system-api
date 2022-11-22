import { Router } from 'express';
import { CommentController } from '../controllers';
import { auth, validateObjectId } from '../middlewares';

export const commentRouter = Router();

commentRouter.route('/')
  .post(auth, CommentController.create);

commentRouter.route('/list')
  .get(auth, CommentController.getAll);

commentRouter.route('/:id')
  .get(auth, validateObjectId, CommentController.getOne)
  .put(auth, validateObjectId, CommentController.update)
  .delete(auth, validateObjectId, CommentController.delete);