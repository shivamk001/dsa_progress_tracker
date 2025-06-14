import mongoose from "mongoose";
import { Password } from "../utils/password";

interface UserAttrs{
    email: string;
    username: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends mongoose.Document{
    email: string;
    username: string;
    password: string;
}


let usersSchema = new mongoose.Schema({
    email: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
}, {
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret.password;
            delete ret._v;
        }
    }
});

usersSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashed = Password
        this.set('password', hashed);
    }
    done();
})

usersSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
}

let User = mongoose.model<UserDoc, UserModel>('User', usersSchema);

export default User;