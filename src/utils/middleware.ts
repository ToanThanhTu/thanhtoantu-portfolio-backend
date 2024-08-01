import { Request, Response, NextFunction } from 'express';

import logger from './logger';

const requestLogger = (request: Request, response: Response, next: NextFunction) => {
    logger.info('Method', request.method);
    logger.info('Path: ', request.url);
    logger.info('Body: ', request.body);
    logger.info('-------');
    next()
};

const unknownEndpoint = (request: Request, response: Response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    logger.error(error.message);
    next(error);
};

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler
}