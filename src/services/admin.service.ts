
const accessTokenExpTime: any = process.env.ACCESS_TOKEN_EXP_TIME || 3600;
const refreshTokenExpTime: any = process.env.REFRESH_TOKEN_EXP_TIME || 43200;
const secretKey: any = process.env.SECRET_KEY;
const userStatus = require("../enums/adminEnum");
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export class AdminService{

    async login(req:any){

        let userData = await UserModel.findOne({emailId:req.body.emailId});
        console.log("")

        if (!userData || !await bcrypt.compareSync(req.body.password, userData.password)) {
            throw 'Email or Password is wrong';
        }

        console.log("accessTokenExpTime",accessTokenExpTime);
        const iat = ~~(Date.now() / 1000);
        const jwtPayload = {
            emailId:userData.emailId,
            name:userData.name,
            id:userData.id
        }
        console.log("jwt payload",jwtPayload)

        const accessToken = jwt.sign(jwtPayload,secretKey, { algorithm: "HS256",expiresIn:'1h'});

        const refreshPayload = {
            emailId:userData.emailId,
            name:userData.name,
        }

        const refreshToken = jwt.sign(refreshPayload,secretKey,{ algorithm: "HS256",expiresIn:'1h'});

        await UserModel.findOneAndUpdate({emailId:req.body.emailId},{$set:{
            updatedTime: new Date(),
            status:userStatus.USER_ACTIVE
        }});

        return {
            accessToken:accessToken,
            refreshToken:refreshToken
        }

    }
    
}
