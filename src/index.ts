import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
const cors = require("cors");
import jwt from 'jsonwebtoken';
let app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
const secretKey: any = process.env.SECRET_KEY;

mongoose.connect("mongodb://localhost:27017/shopping");
let db = mongoose.connection;
db.on("error",(error: any)=> console.log(error));
db.on("open",()=>console.log("DB connection Established!"));

// app.use(async (req:any,res:any,next:any)=>{
//   if (req.header('authorization')) {
//     try {
//       let authorizationToken = req.header('authorization');
//       jwt.verify(authorizationToken, secretKey);
//     } catch (err:any) {
//         console.log("Got error while decoding jwt throwing error", err);
//         throw "AUTHORIZATION TOKEN is invalid or expired";
//     }
//   } else {
//     throw "AUTHORIZATION TOKEN is invalid or missing";
//   }
//    next()
// })



app.use("/admin",require("./controllers/admin"));
// app.use("/productType",require("./controllers/itemCategory"));
app.use("/product",require("./controllers/product"));
app.use("/user",require("./controllers/user"));
app.use("/order",require("./controllers/order"));
// app.use("/cart",require("./controllers/cart"));

app.listen(1309,function(){
    console.log("Listening to Server 1309");
})