import express from 'express';
const router = express.Router();
import {UserService} from "../services/user.service";
const userService = new UserService();

router.post("/create", async(req:any,res:any)=>{
    try{
        await userService.userCreate(req.body);
        res.end(JSON.stringify({status:"success"
        }));
    } catch(err){
        console.log("Error while user creation",err);
        res.end(JSON.stringify({data:err? err:'Failed to login'}));
    }
})

module.exports = router;