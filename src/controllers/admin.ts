import express from 'express';
const router = express.Router();
import {AdminService} from "../services/admin.service";
const adminService = new AdminService();

router.post("/login", async(req:any,res:any)=>{
    try{
        let tokens:{accessToken:string,refreshToken:string} = await adminService.login(req);
        console.log("tokens.......",tokens);
        res.end(JSON.stringify({status:"success",data:{
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken 
        }}));
    } catch(err){
        console.log("Error while login",err);
        res.end(JSON.stringify({data:err? err:'Failed to login'}));
    }
})

module.exports = router;