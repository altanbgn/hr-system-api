import { Router } from 'express';
import { UserController } from '../controllers';
import { auth, validateObjectId } from '../middlewares';

export const userRouter = Router();

userRouter.route('/me')
  .get(auth, UserController.me)
  .put(auth, UserController.updateMe)
  
userRouter.route('/change-password')
  .put(auth, UserController.changePassword)
  
userRouter.route('/list')
  .get(auth, UserController.getAll)

userRouter.route('/:id')
  .get(validateObjectId, auth, UserController.getOne)
  .put(validateObjectId, auth, UserController.update)
  .delete(validateObjectId, auth, UserController.delete)
  