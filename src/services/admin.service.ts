const secretKey: any = process.env.SECRET_KEY;
import {userStatus} from '../enums/adminEnum';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export class AdminService{

    async login(req:any){
        try{
            let userData = await UserModel.findOne({emailId:req.body.emailId});

            if (!userData || !await bcrypt.compareSync(req.body.password, userData.password)) {
                throw 'Email or Password is wrong';
            }

            const jwtPayload = {
                emailId:userData.emailId,
                name:userData.name,
                id:userData.id
            }

            const accessToken = jwt.sign(jwtPayload,secretKey, { algorithm: "HS256",expiresIn:'1h'});

            const refreshPayload = {
                emailId:userData.emailId,
                name:userData.name,
            }

            const refreshToken = jwt.sign(refreshPayload,secretKey,{ algorithm: "HS256",expiresIn:'1h'});

            let user = await UserModel.findOneAndUpdate({emailId:req.body.emailId},{$set:{
                updatedTime: new Date(),
                status:userStatus.USER_ACTIVE
            }});

            return {
                accessToken:accessToken,
                refreshToken:refreshToken
            }
        }catch(err){
            console.log(err);
        }     
    }

    async logout(body:any){
        if(body.status!="INACTIVE"){
            throw 'Inactive User tring to logout'
        }
        let user = await UserModel.findOneAndUpdate({id:body.id},{$set:{
            updatedTime: new Date(),
            status:userStatus.USER_INACTIVE
        }});
        console.log("user.........",user)
        return 'Logged out Successfully';
    }
    
}
