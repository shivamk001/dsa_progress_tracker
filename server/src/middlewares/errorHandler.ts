import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";

const errorHandlingMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction)=>{
    let status = err.status;
    let message = err.message;

    res.status(status).send(message);
}

export default errorHandlingMiddleware;