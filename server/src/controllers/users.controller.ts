import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/usersService";

export class UsersController{

    public static async getUserProgress(req: Request, res: Response, next: NextFunction){
        try{
            let currentUser = req.currentUser;

            let progress = await UsersService.getUserProgress(currentUser.id);

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
            console.log('MARKPROBLEM:', req.body, currentUser);
            

            await UsersService.markProblem(currentUser.id, problemId, mark);

            res.status(200).send('Done');
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