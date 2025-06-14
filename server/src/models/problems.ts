import mongoose from "mongoose";

enum Level{
    Easy='easy',
    Medium='medium',
    Hard='hard'
}

interface ProblemsAttrs{
    name: string;
    description: string;
    topic: string;
    level: Level;
    Statement: string;
    youtube: string;
    article: string;
    leetcode: string;
}

interface ProblemsModel extends mongoose.Model<ProblemsDoc>{
    build(attrs: ProblemsAttrs): ProblemsDoc
}

interface ProblemsDoc extends mongoose.Document{
    name: string;
    description: string;
    topic: string;
    level: string;
    Statement: string;
    youtube: string;
    article: string;
    leetcode: string;
}

let problemsSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    topic: {type: String, require: true},
    level: {type: String, require: true, enum: ['easy', 'medium', 'hard']},
    statement: {type: String, require: true},
    youtube: {type: String, require: true},
    article: {type: String, require: true},
    leetcode: {type: String, require: true}
});

problemsSchema.statics.build = (attrs: ProblemsAttrs) =>{
    return new Problems(attrs);
}

let Problems = mongoose.model<ProblemsDoc, ProblemsModel>('Problems', problemsSchema);

export default Problems