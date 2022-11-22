import { Router } from 'express';
import { RiskController } from '../controllers';
import { auth, validateObjectId } from '../middlewares';

export const riskRouter = Router();

riskRouter.route('/')
  .post(auth, RiskController.create);

riskRouter.route('/list')
  .get(auth, RiskController.getAll);

riskRouter.route('/:id')
  .get(auth, validateObjectId, RiskController.getOne)
  .put(auth, validateObjectId, RiskController.update)
  .delete(auth, validateObjectId, RiskController.delete);