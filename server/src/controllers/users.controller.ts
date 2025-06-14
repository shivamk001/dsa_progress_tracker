import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/usersService";

export class UsersController{

    public static async getUserProgress(req: Request, res: Response, next: NextFunction){
        try{
            let currentUser = req.currentUser;

            let progress = UsersService.getUserProgress(currentUser.id);

            res.json({
                data: progress
            })
        }
        catch(err){
            next(err);
        }
    }

    public static async markProblem(req: Request, res: Response, next: NextFunction){
        try{

            let currentUser = req.currentUser;

            let {problemId, mark} = req.body;

            await UsersService.markProblem(currentUser.id, problemId, mark);

            res.status(200).json({
                user: req.currentUser
            });
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