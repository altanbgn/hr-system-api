import { Response, Request, NextFunction } from 'express';
import { createResponse } from '../utils';

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  res.status(error.status || 500).send(
    createResponse(
      error.status,
      error.message,
      error.data
    )
  );
}

export function unknownRouteHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404).send(createResponse(404, 'Wrong request'))
}