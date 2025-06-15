import { NextFunction, Request, Response } from "express";
import { ProblemsService } from "../services/problemsService";

export class ProblemsController{
    public static async getAllProblems(req: Request, res: Response, next: NextFunction){
        try{
            let problems = await ProblemsService.getAllProblems();
            res.json({
                ...problems
            });
        }
        catch(err){
            next(err);
        }
    }

    public static async getProblem(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;

            let problem = await ProblemsService.getProblemById(id);

            res.json({data: problem});
        }
        catch(err){
            next(err);
        }
    }

    public static async getProblemByQuery(req: Request, res: Response, next: NextFunction){
        try{

            let {name, topic, level} = req.query;

            const filter: any = {};

            if (topic) {
                filter.topic = topic;
            }
            if (level) {
                filter.level = level;
            }
            if(name){
                filter.name = name;
            }

            let problem = await ProblemsService.getProblemByQuery(filter);

            res.json({data: problem});
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