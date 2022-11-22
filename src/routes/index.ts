import { Express, Request, Response } from 'express';
import { errorHandler, unknownRouteHandler } from '../middlewares';
import { authRouter } from './auth';
import { userRouter } from './user';
import { departmentRouter } from './department';
import { taskRouter } from './task';
import { commentRouter } from './comment';
// import { clientRouter } from './client';

const basename: string = '/api';

export function initRoutes(app: Express) {
  app.get(basename + '/health', async (req: Request, res: Response) => {
    res.end("OK!");
  });

  app.use(basename + '/auth', authRouter);
  app.use(basename + '/user', userRouter);
  app.use(basename + '/department', departmentRouter);
  app.use(basename + '/task', taskRouter);
  app.use(basename + '/comment', commentRouter);
  // app.use(basename + '/client', clientRouter);

  app.use(errorHandler);
  app.use(unknownRouteHandler);
}
