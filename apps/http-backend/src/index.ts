import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { middleware } from "./middleware";

const app = express();
app.use(express.json())

app.post("/signup" ,  (req , res) =>{
    try{

    
    const firstname = req.body?.firstname
    const lastname = req.body?.lastname
    const username = req.body?.username
    const password = req.body?.password
    console.log(firstname + lastname + username + password)


    // check for the user in db if already exist then send them user exist 
    // const isUser = await UserModel.findFirst({
    //     where : {
    //         username : username
    //     }

    // })

    // if(isUser) {
    //     res.send({
    //         "message":"User already exist"
    //     })
    // }
    // else{
    // const response = await UserModel.create {
    //     data :{
    //         firstName,
    //         lastName,
    //         username,
    //         password
    //     }
    // }
    //     if(response.data == "success"){
    //         res.send({
    //             "message":"user Created"
    //         })
    //     }
    // }
    }catch(e){
        res.json({
            "message" : " server error"
        }
        )
    }
})

app.post("/signin" , (req , res) =>{
   const username = req.body?.username
   const password = req.body?.password

//    logic for the user to find the user in the db
        const token = jwt.sign({
            username
        },JWT_SECRET)
        res.json({
            token :token
        })
})

app.post("/createRoom" ,middleware, (req, res) =>{
    // logic to create a room and let people join it
})
app.listen(3001)