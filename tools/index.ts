import { Request, Response, NextFunction } from 'express';

const middleWareWrapper = (callback: Function) =>
    (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve(callback(request, response, next))
        .catch(
            (err) => next(err)
        );
    };

    const timeout = (milliSeconds: number) => new Promise((resolve: Function) => {
        setTimeout(() => resolve(), milliSeconds);
    });

export { middleWareWrapper, timeout };