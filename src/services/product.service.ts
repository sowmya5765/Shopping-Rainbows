import { ItemModel } from "../models/product.model";
import { v4 as uuidv4 } from 'uuid'; 


export class ProductService{
    async allProductData(){
        try{
            let productData = await ItemModel.find();
            return productData;
        }catch(err){
            throw err;
        }
    }

    async createProduct(body:any){
        try{
            body.id = uuidv4();
            await ItemModel.insertMany([body]);
            return body;
        }catch(err){
            throw err;
        }
    }

    async getProductData(id:any){
        try{
            console.log("id",id)
            let productData = await ItemModel.findOne({id:id});
            console.log("datafya",productData)
            return productData;
        }catch(err){
            throw err;
        }
    }

    async getCategoryWiseProduct(category:any){
        try{
            let catergoryData = await ItemModel.find({itemCategory:category});
            return catergoryData;
        }catch(err){
            throw err;
        }
    }
}