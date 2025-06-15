import mongoose from "mongoose";
import Done, {DoneDoc} from "../models/done";
import Problems, { ProblemsDoc } from "../models/problems";
import logger from "../utils/logger";
import { CustomError } from "../utils/error";

export class UsersService{
    public static async getUserProgress(userId: string): Promise<DoneDoc[]>{

        let done = await Done.find({
            userId
        });

        return done;
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
            // create entry
            let done = Done.build({
                userId,
                problemId,
                level: problem.level,
                topic: problem.topic
            });
            await done.save();
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