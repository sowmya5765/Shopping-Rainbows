
const accessTokenExpTime: string = process.env.ACCESS_TOKEN_EXP_TIME || '3600';
const refreshTokenExpTime: string = process.env.ACCESS_TOKEN_EXP_TIME || '43200';
const secretKey: any = process.env.SECRET_KEY;
const userStatus = require("../enums/adminEnum");
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import {v4 as uuidv4} from 'uuid';

export class UserService{

    async userCreate(reqBody:any){
        reqBody.id = uuidv4();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(reqBody.password, salt);
        reqBody.password = hash;
        console.log("req bodyyyyyyy",reqBody)
        return await UserModel.insertMany([reqBody]);
    }
    
}
