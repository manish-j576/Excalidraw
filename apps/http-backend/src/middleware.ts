import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function middleware(req : Request, res :Response , next :NextFunction){
    const token = req.headers["authorization"] ?? ""
    const decode = jwt.verify(token , JWT_SECRET)
    if(decode){
        console.log(decode)
        // @ts-ignore
        req.userId = decode.id
        next()
    }
    else{
        res.send({
            "message" : "Unauthorize user"
        }).status(403)
    }
}