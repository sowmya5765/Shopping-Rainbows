import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let schema = new Schema({
    id:{type: String, required:true},
    name:{type:String, required:true},
    emailId:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    address:{type:String,required:true},
    password:{type:String, required:true},
    status:{type:String,required:true},
    createdTime:{ type: Date, default: new Date()},
    updatedTime:{ type: Date, default: new Date()}
});

export const UserModel = mongoose.model("users",schema);
