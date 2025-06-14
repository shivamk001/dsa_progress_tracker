import { NextFunction, Request, Response } from "express";
import { ProblemsService } from "../services/problemsService";


export class ProblemsController{
    public static async getAllProblems(req: Request, res: Response, next: NextFunction){
        try{
            let problems = ProblemsService.getAllProblems();

            res.json(problems);
        }
        catch(err){
            next(err);
        }
    }

    public static async getProblem(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;

            let problem = ProblemsService.getProblemById(id);

            res.json(problem);
        }
        catch(err){
            next(err);
        }
    }

    public static async tbd(req: Request, res: Response,  next: NextFunction){
        try{

        }
        catch(err){
            next(err);
        }
    }
}