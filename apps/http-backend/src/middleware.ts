import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config";

export function middleware(req : Request, res :Response , next :NextFunction){
    const token = req.headers["authorization"] ?? ""
    const decode = jwt.verify(token , JWT_SECRET)
    if(decode){
        // @ts-ignore
        req.userId = decode.userId
        next()
    }
    else{
        res.send({
            "message" : "Unauthorize user"
        }).status(403)
    }
}