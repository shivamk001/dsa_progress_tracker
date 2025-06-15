import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { CustomError } from "../utils/error";

const currentUser = (req: Request, res: Response, next: NextFunction) =>{
    console.log('session:', req.session, process.env.JWT_KEY!);
    
    let {jwt: jwtToken} = req.session;

    if(!jwt){
        throw new CustomError(401, 'Unauthorized User');
    }
    let user = jwt.verify(jwtToken, process.env.JWT_KEY!);
    console.log('CURRENT USER:', user);
    
    if(user){
        req.currentUser = user;
        next();
    }
    else {
        let err = new CustomError(401, 'Unauthorized User');
        next(err);
    }   
    
}

export default currentUser;