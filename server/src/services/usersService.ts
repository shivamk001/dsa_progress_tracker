import mongoose from "mongoose";
import Done, {DoneDoc} from "../models/done";
import Problems, { Level, ProblemsDoc } from "../models/problems";
import logger from "../utils/logger";
import { CustomError } from "../utils/error";

export class UsersService{
    public static async getUserProgress(userId: string): Promise<
        { 
            done: DoneDoc[], 
            totalDone: number,
            totalEasyDone: number,
            totalMediumDone: number,
            totalHardDone: number
        }>{

        let done = await Done.find({
            userId
        }).select('problemId level topic');

        let totalDone = done.length;

        let totalEasyDone = done.filter((problem: DoneDoc) => problem.level == Level.Easy).length;

        let totalMediumDone = done.filter((problem: DoneDoc) => problem.level == Level.Medium).length;

        let totalHardDone = done.filter((problem: DoneDoc) => problem.level == Level.Hard).length;

        return {
            done,
            totalDone,
            totalEasyDone,
            totalHardDone,
            totalMediumDone
        };
    }

    public static async markProblem(userId: string, problemId: string, mark: true): Promise<void>{

        if(problemId == undefined || mark == undefined){
            throw new CustomError(400, `Invalid input: ${problemId === undefined ? 'ProblemId' : ''} ${mark === undefined ? 'Mark' : ''} is undefined`);
        }

        // get the problem
        let problem: ProblemsDoc | null= await Problems.findOne({
                _id: problemId
        });

        if(!problem){
            throw new CustomError(404, 'Problem not found');
        }
        if(mark){

            // create entry and check for duplicates
            await Done.findOneAndUpdate({
                userId,
                problemId,
                level: problem.level,
                topic: problem.topic
            },
            { $setOnInsert: { userId, problemId, level: problem.level, topic: problem.topic  } },
            { upsert: true, new: true });
        }
        else{
            // delete entry
            let result = await Done.deleteOne({
                userId: new mongoose.Types.ObjectId(userId),
                problemId: new mongoose.Types.ObjectId(problemId),
                level: problem.level,
                topic: problem.topic
            });
            logger.info(`RESULT: ${JSON.stringify(result)}`);
        }
    }

}