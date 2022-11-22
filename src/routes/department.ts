import { Router } from 'express';
import { DepartmentController } from '../controllers';
import { auth, validateObjectId } from '../middlewares';

export const departmentRouter = Router();

departmentRouter.route('/')
  .post(auth, DepartmentController.create);

departmentRouter.route('/list')
  .get(auth, DepartmentController.getAll);

departmentRouter.route('/:id')
  .get(auth, validateObjectId, DepartmentController.getOne)
  .put(auth, validateObjectId, DepartmentController.update)
  .delete(auth, validateObjectId, DepartmentController.delete);