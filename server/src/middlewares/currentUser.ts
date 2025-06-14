import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const currentUser = (req: Request, res: Response, next: NextFunction) =>{
    console.log('session:', req.session, process.env.JWT_KEY!);
    
    let {jwt: jwtToken} = req.session;
    let user = jwt.verify(jwtToken, process.env.JWT_KEY!);
    console.log('USER:', user);
    
    if(user){
        req.currentUser = user;
        next();
    }
    res.status(401);
}

export default currentUser;