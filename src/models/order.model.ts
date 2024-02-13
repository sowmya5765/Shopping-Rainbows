let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema({
    id:{type: String, required:true},
    userId:{type: String, required:true},
    orderDate:{ type: Date, default: Date.now },
    address:{type: String, required:true},
    city:{type: String, required:true},
    state:{type: String, required:true},
    pinCode:{type:String,required:true},
    amtPaid:{type:Number,required:true},
    status:{type: String, required:true},
    items:[]
});

export const OrderModel = mongoose.model("orders",schema);