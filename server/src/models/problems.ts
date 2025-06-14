import mongoose from "mongoose";

export enum Level{
    Easy='easy',
    Medium='medium',
    Hard='hard'
}

export interface ProblemsAttrs{
    id?: string;
    name: string;
    topic: string;
    level: Level;
    statement: string;
    youtube: string;
    article: string;
    leetcode: string;
}

interface ProblemsModel extends mongoose.Model<ProblemsDoc>{
    build(attrs: ProblemsAttrs): ProblemsDoc
}

export interface ProblemsDoc extends mongoose.Document{
    name: string;
    topic: string;
    level: string;
    statement: string;
    youtube: string;
    article: string;
    leetcode: string;
}

let problemsSchema = new mongoose.Schema({
    name: {type: String, require: true},
    topic: {type: String, require: true},
    level: {type: String, require: true, enum: ['easy', 'medium', 'hard']},
    statement: {type: String, require: true},
    youtube: {type: String, require: true},
    article: {type: String, require: true},
    leetcode: {type: String, require: true}
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

problemsSchema.statics.build = (attrs: ProblemsAttrs) =>{
    return new Problems(attrs);
}

let Problems = mongoose.model<ProblemsDoc, ProblemsModel>('Problems', problemsSchema);

export default Problems