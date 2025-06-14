import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/usersService";

export class UsersController{

    public static async getUserProgress(req: Request, res: Response, next: NextFunction){
        try{
            let progress = UsersService.getUserProgress();
        }
        catch(err){
            next(err);
        }
    }

    public static async markProblem(req: Request, res: Response, next: NextFunction){
        try{
            let markProblem = UsersService.markProblem();
        }
        catch(err){
            next(err);
        }
    }

    public static async tbd(req: Request, res: Response, next: NextFunction){
        try{

        }
        catch(err){
            next(err);
        }
    }

    // public static async tbd(req: Request, res: Response, next: NextFunction){
    //     try{

    //     }
    //     catch(err){
    //         next(err);
    //     }
    // }
}