import Problems, { Level, ProblemsDoc } from "../models/problems";
import { CustomError } from "../utils/error";
import logger from "../utils/logger";

interface TopicWiseProblems{
    [key: string] : ProblemsDoc[];
}

interface Query{
    name?: string;
    topic?: string;
    level?: string;
}

// TODO: complete this
export class ProblemsService{
    public static async getAllProblems(): Promise<{topicWiseProblems: TopicWiseProblems, totalProblems: number, totalEasyProblems: number, totalMediumProblems: number, totalHardProblems: number }>{
        let problems: ProblemsDoc[] = await Problems.find({});
        // console.log(problems); 

        let topicWiseProblems: TopicWiseProblems = {};

        let totalEasyProblems = 0;
        let totalMediumProblems = 0;
        let totalHardProblems = 0;

        problems.forEach(problem=>{
            let topic = problem['topic'];
            if(!topicWiseProblems[topic]){
                topicWiseProblems[topic] = [];
            }
            topicWiseProblems[topic].push(problem);

            totalEasyProblems += problem.level === Level.Easy ? 1:0; 
            totalMediumProblems += problem.level === Level.Medium ? 1:0; 
            totalHardProblems += problem.level === Level.Hard ? 1:0; 

        })
        return {
            topicWiseProblems,
            totalProblems: problems.length,
            totalEasyProblems,
            totalMediumProblems,
            totalHardProblems
        };
    }

    public static async getProblemById(id: string): Promise<ProblemsDoc | null>{
        let problem: ProblemsDoc | null= await Problems.findById({_id: id});
        // console.log(problem); 

        return problem;
    }

    public static async getProblemByQuery(query: Query): Promise<ProblemsDoc[] | null>{
        if(!query.level && !query.topic && !query.name){
            throw new CustomError(400, 'No query provided');
        }
        // console.log(query);

        let problem: ProblemsDoc[] | null= await Problems.find({
                ...(query.topic && { topic: query.topic }),
                ...(query.name && { name: { $regex: query.name, $options: 'i' }}),
                ...(query.level && { level: query.level })
        });
        // console.log(problem); 

        return problem;
    }

}