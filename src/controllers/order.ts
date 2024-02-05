import express from 'express';
const router = express.Router();
import {OrderService} from '../services/order.service';
 
const orderService = new OrderService();

router.get('/getAllOrders',async (req:any,res:any)=>{
    try{
        let orderData = await orderService.getAllOrder();
        res.status(200).send({
            status:'success',
            data:orderData
        })
    }catch(err){
        res.status(500).send({
            status :'failed',
            message:'Failed to get all orders'
        })
    }
})

router.post('/getOrder',async (req:any,res:any)=>{
    try{
        let orderData = await orderService.getSingleOrder(req.body.id);
        res.status(200).send({
            status:'success',
            data:orderData
        })
    }catch(err){
        res.status(500).send({
            status :'failed',
            message:'Failed to get the order'
        })
    }
})

router.post('/createOrder',async (req:any,res:any)=>{
    try{
        let orderData = await orderService.bookOrder(req.body);
        res.status(200).send({
            status:'success',
            data:orderData
        })
    }catch(err){
        res.status(500).send({
            status :'failed',
            message:'Failed to get all orders'
        })
    }
})

router.post('/paymentUpdation',async (req:any,res:any)=>{
    try{
        let orderData = await orderService.paymentUpdation(req.body.id);
        res.status(200).send({
            status:'success',
            data:orderData
        })
    }catch(err){
        res.status(500).send({
            status :'failed',
            message:'Failed to update payment'
        })
    }
})


module.exports = router;