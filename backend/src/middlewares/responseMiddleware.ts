import { Request, Response, NextFunction } from 'express';
import ApiResponse from '../interface/api.response.interface';


declare module 'express-serve-static-core' {
    interface Response {
        success: (data?: any, paginationMeta?: object, message?: string, httpCode?: number) => void;
        error: (message: string, httpCode?: number, data?:any, paginationMeta?: object) => void;
    }
}

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.success = (data?: any, paginationMeta: object = {}, message: string = 'None', httpCode: number = 200) => {
        const response: ApiResponse = {
            meta: {
                status: true,
                message,
                pages: paginationMeta,
            },
            data,
        };
        res.status(httpCode).json(response);
    };

    res.error = (message: string = 'None', httpCode: number = 400, data: any = {}, paginationMeta: object = {}) => {
        const response: ApiResponse = {
            meta: {
                status: false,
                message,
                pages: paginationMeta,
            },
            data,
        };
        res.status(httpCode).json(response); // You can adjust the status code as needed
    };

    next();
};
