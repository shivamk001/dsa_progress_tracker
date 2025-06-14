import mongoose from "mongoose";

interface DoneAttrs{
    userId: string;
    problemId: string;
}

interface DoneModel extends mongoose.Model<DoneDoc>{
    build(attrs: DoneAttrs): DoneDoc;
}

interface DoneDoc extends mongoose.Document{
    userId: string;
    problemId: string;
}


let doneSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', require: true},
    problemId: {type: mongoose.Schema.Types.ObjectId, ref: 'Problems', require: true},
    level: {type: String, require: true, enum: ['easy', 'medium', 'hard']}
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

let Done = mongoose.model<DoneDoc, DoneModel>('User', doneSchema);

export default Done;