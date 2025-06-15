import mongoose from "mongoose";
import { Level } from "./problems";
import { Topics } from "./topics";

interface DoneAttrs{
    userId: string;
    problemId: string;
    // level: Level;
    // topics: Topics
    level: string;
    topic: string
}

interface DoneModel extends mongoose.Model<DoneDoc>{
    build(attrs: DoneAttrs): DoneDoc;
}

export interface DoneDoc extends mongoose.Document{
    userId: string;
    problemId: string;
    level: string;
    topic: string;
}


let doneSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true},
    problemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Problems', require: true},
    level: {type: String, require: true, enum: ['easy', 'medium', 'hard']},
    topic: {type: String, require: true}
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
        }
    }
});

doneSchema.statics.build = (attrs: DoneAttrs)=>{
    return new Done(attrs);
}

let Done = mongoose.model<DoneDoc, DoneModel>('Done', doneSchema);

export default Done;