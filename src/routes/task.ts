import { Router } from 'express';
import { TaskController } from '../controllers';
import { auth, validateObjectId } from '../middlewares';

export const taskRouter = Router();

taskRouter.route('/')
  .post(auth, TaskController.create)

taskRouter.route('/list')
  .get(auth, TaskController.getAll)

taskRouter.route('/:id')
  .get(auth, validateObjectId, TaskController.getOne)
  .put(auth, validateObjectId, TaskController.update)
  .delete(auth, validateObjectId, TaskController.delete)