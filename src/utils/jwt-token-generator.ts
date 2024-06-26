import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id:string , email:string , expiresIn: string)=>{
     const token = jwt.sign({id , email},process.env.JWT_SECRET , {expiresIn});
     return token;
}

export const verifytoken = async (
     req:Request,
      res:Response, 
      next:NextFunction
      ) => {
          const token = req.signedCookies[`${COOKIE_NAME}`];
          if(!token || token.trim()===""){
               return res.status(401).json({message:"Token Not Received"})
          }
          //console.log(token);
          return new Promise<void>((resolve, reject) => {
               jwt.verify(token , process.env.JWT_SECRET , (err, success)=>{
                     if(err){
                         reject(err.message);
                         return res.status(401).json({message:"Token Expired"});
                     } else {
                         console.log("Token Verification Successful");
                         resolve();
                         res.locals.jwtData = success;
                         return next();
                     }
               } )
          })
      };