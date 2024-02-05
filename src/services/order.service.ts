import { OrderModel } from "../models/order.model";
import { v4 as uuidv4 } from 'uuid';
import { ItemModel } from "../models/product.model";

export class OrderService{

    async getAllOrder(){
        try{
            let orderData = await OrderModel.find();
            return orderData;
        }catch(err){
            throw err;
        }
    }

    async getSingleOrder(id:any){
        try{
            let orderData = await OrderModel.findOne({id:id})
        }catch(err){
            throw err;
        }
    }

    async bookOrder(body:any){
        try{
            body.id = uuidv4();
            await OrderModel.insertMany([body]);
            body.items.map(async (item:any)=>{
                await ItemModel.findOneAndUpdate({id:item.id},{ $inc: {inStock: -item.quantity}})
            })     
            return body;
        }catch(err){
            throw err;
        }
    }

    async paymentUpdation(id:any){
        try{
            let orderData = await OrderModel.findOneAndUpdate({id:id},{status:"CONFIRMED"});
            return orderData;
        }
        catch(err){
        throw err;
        }
}
}