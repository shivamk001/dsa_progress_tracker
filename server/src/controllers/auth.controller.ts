import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import User from "../models/user";
import { CustomError } from "../utils/error";
import { validationResult } from "express-validator";
import { Password } from "../utils/password";

export class AuthController{
    public static async signin(req: Request, res: Response){
        const { email, password } = req.body;

        const existingUser = await User.findOne({email});
        console.log('ExistingUser', existingUser);
        
        if(!existingUser){
            throw new CustomError(401, 'Invalid Credentials 1');
        }

        const passwordsMatch=await Password.compare(existingUser!.password, password);
        
        if(!passwordsMatch){
            throw new CustomError(401, 'Invalid Credentials');
        }

        //generate jwt
        const userJWT=jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
        }, process.env.JWT_KEY!)

        // store it on session object
        req.session={
            jwt: userJWT
        }
        console.log('REQ SES:', req.session);
        
        res.status(200).send(existingUser);
    }

    public static async signup(req: Request, res: Response){
        const error=validationResult(req);

        if(!error.isEmpty()){
            throw new CustomError(400, error.array().join(' '));
        }

        const { email, username, password }=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
            throw new CustomError(401, 'Email in use'); 
        }

        const user=User.build({email, username, password});
        await user.save();

        // generate JWT
        const userJWT=jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        // store it on session object
        req.session={
            jwt: userJWT
        };
        
        res.status(201).send(user);
    }

    public static async signout(req: Request, res: Response){
        req.session=null;
        res.send({});
    }

    public static async currentUser(req: Request, res: Response){
        res.send(req.currentUser);
    }
}