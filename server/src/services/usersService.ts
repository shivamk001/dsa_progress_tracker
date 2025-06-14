import Done, {DoneDoc} from "../models/done";
import Problems, { ProblemsDoc } from "../models/problems";

// TODO: complete this
export class UsersService{
    public static async getUserProgress(userId: string): Promise<DoneDoc[]>{

        let done = await Done.find({
            userId
        });

        return done;
    }

    public static async markProblem(userId: string, problemId: string, mark: true): Promise<void>{

        // get the problem
        let problem: ProblemsDoc | null= await Problems.findOne({
                _id: problemId
        });

        if(!problem){
            // TODO: cr4eate error class not found
            throw new Error('not found');
        }
        if(mark){
            // create entry
            let done = Done.build({
                userId,
                problemId,
                level: problem.level,
                topics: problem.topic
            });
            await done.save();
        }
        else{
            // delete entry
            await Done.findOneAndDelete({
                userId,
                problemId,
                level: problem.level,
                topics: problem.topic
            });
        }
    }

}