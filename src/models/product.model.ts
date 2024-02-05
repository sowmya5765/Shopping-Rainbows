let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema({
    id:{type: String, required:true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    itemCategory:{type: String,required:true},
    inStock:{type:Number},
    imageUrl:{type:String},
    createdTime: { type: Date, default: Date.now },
    updatedTime: { type: Date, default: Date.now }
});

export const ItemModel = mongoose.model("products",schema);