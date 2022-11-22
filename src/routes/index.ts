import { Express, Request, Response } from 'express';
import { errorHandler, unknownRouteHandler } from '../middlewares';
import { authRouter } from './auth';
import { commentRouter } from './comment';
import { departmentRouter } from './department';
import { fileRouter } from './file';
import { reviewRouter } from './review';
import { riskRouter } from './risk';
import { taskRouter } from './task';
import { userRouter } from './user';

const basename: string = '/api';

export function initRoutes(app: Express) {
  app.get(basename + '/health', async (req: Request, res: Response) => {
    res.end("OK!");
  });

  app.use(basename + '/auth', authRouter);
  app.use(basename + '/comment', commentRouter);
  app.use(basename + '/department', departmentRouter);
  app.use(basename + '/file', fileRouter);
  app.use(basename + '/review', reviewRouter)
  app.use(basename + '/risk', riskRouter);
  app.use(basename + '/task', taskRouter);
  app.use(basename + '/user', userRouter);


  app.use(errorHandler);
  app.use(unknownRouteHandler);
}
