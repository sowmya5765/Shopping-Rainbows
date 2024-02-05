import express from 'express';
const router = express.Router();
import {AdminService} from "../services/admin.service";
const adminService = new AdminService();

router.post("/login", async(req:any,res:any)=>{
    try{
        let tokens:any = await adminService.login(req);
        console.log("tokens.......",tokens);
        res.status(200).send({status:"success",data:{
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken 
        }});
    } catch(err){
        console.log("Error while login",err);
        res.status(500).send({data:err? err:'Failed to login'});
    }
})

router.post("/logout",async(req:any,res:any)=>{
    try{
        let msg= await adminService.logout(req.body);
        res.status(200).send({status:"success",data:{msg}});
    }catch(err){
        console.log("Error while logout",err);
        res.status(500).send({data:err? err:'Failed to logout'});
    }
})

module.exports = router;