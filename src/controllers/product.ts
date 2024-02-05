import express from 'express';
const router = express.Router();
import { ProductService } from '../services/product.service';

const productService = new ProductService();

router.post('/createProduct',async (req:any,res:any)=>{
    try{
        let createdProductData = await productService.createProduct(req.body);
        res.status(200).send({
            status:'success',
            data:createdProductData
        })
    }catch(err){
        res.status(500).send({
            status:'failed',
        })
    }
})

router.get('/getAllProducts',async(req:any,res:any)=>{
    try{
        //implement pagination
        let productData = await productService.allProductData();
        res.status(200).send({
            status:'success',
            data:productData
        })
    }catch(err){
        res.status(500).send({
            status:'failed',
            message:'Failed to get all products'
        })
    }
})

router.post('/getProduct',async(req:any,res:any)=>{
    try{
        console.log("req.body",req.body)
        let productData = await productService.getProductData(req.body.id);
        res.status(200).send({
            status:'success',
            data:productData
        })
    }catch(err){
        res.status(500).send({
            status:'failed',
            message:'Failed to get product'
        })
    }
})

router.post('/getCategoryWiseProducts',async(req:any,res:any)=>{
    try{
        //implement pagination
        let catergoryData = await productService.getCategoryWiseProduct(req.body.category)
        res.status(200).send({
            status:'success',
            data:catergoryData
        })
    }catch(err){
        res.status(500).send({
            status:'failed',
            message:'Failed to get products category wise'
        })
    }
})

module.exports = router;