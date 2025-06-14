import Problems, { ProblemsDoc } from "../models/problems";
import { Topics } from "../models/topics";
import logger from "../utils/logger";

interface TopicWiseProblems{
    [key: string] : ProblemsDoc[]
}

interface Query{
    name?: string;
    topic?: string;
    level?: string;
}

// TODO: complete this
export class ProblemsService{
    public static async getAllProblems(): Promise<TopicWiseProblems>{
        let problems: ProblemsDoc[] = await Problems.find({});
        console.log(problems); 

        let topicWiseProblems: TopicWiseProblems = {};

        problems.forEach(problem=>{
            let topic = problem['topic'];
            if(!topicWiseProblems[topic]){
                topicWiseProblems[topic] = [];
            }
            topicWiseProblems[topic].push(problem);
        })
        return topicWiseProblems;
    }

    public static async getProblemById(id: string): Promise<ProblemsDoc | null>{
        let problem: ProblemsDoc | null= await Problems.findById({_id: id});
        console.log(problem); 

        return problem;
    }

    public static async getProblemByQuery(query: Query): Promise<ProblemsDoc[] | null>{
        if(!query.level && !query.topic && !query.name){
            throw new Error('No query provided');
        }
        console.log(query);

        let problem: ProblemsDoc[] | null= await Problems.find({
                ...(query.topic && { topic: query.topic }),
                ...(query.name && { name: { $regex: query.name, $options: 'i' }}),
                ...(query.level && { level: query.level })
        });
        console.log(problem); 

        return problem;
    }

}