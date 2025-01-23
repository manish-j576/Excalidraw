import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect credientials",
    });
    return;
  }

  try {
    const firstname = req.body?.firstname;
    const lastname = req.body?.lastname;
    const username = req.body?.username;
    const password = req.body?.password;

    const isUser = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });
    if (isUser) {
      res.json({
        message: "User already exist",
      });
    } else {
    const response = await prismaClient.user.create({
        data: {
          firstname,
          lastname,
          username,
          password,
        },
      });
      if(response){
        res.json({
            "message":"your are signed up"
        })
      }
      else{
        res.json({
            "message":"something went wrong"
        })
      }
    }
}catch(e){
        res.send({
          "message":"error occured"
        })
    }
});

app.post("/signin",async (req, res) => {
    try{
        
        const password = req.body?.password;
        const username = req.body?.username;
    
  const isUser = await prismaClient.user.findFirst({
    where: {
      username: username,
    },
  });

  if(!isUser){
    res.json({
        "message":"User Doesnt exist"
    })    
  }
  if(isUser?.password===password){
    const id = isUser?.id
    const token = jwt.sign(
        {
          username,
          id
        },
        JWT_SECRET
      );
      res.json({
        token: token,
        firstname : isUser?.firstname
      });
  }
}catch(e){
    res.json({
        "message":"Error occured"
    })
}

})
app.post("/room", middleware,async (req, res) => {

  try{

    // logic to create a room and let people join it
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
      res.json({
      "message":"Incorrect inputs"
    })
    return
  }
  //@ts-ignore
  const userId = req.userId;
 
  await prismaClient.room.create({
    data : {
      slug : parsedData.data.room,
      adminId : userId
    }
    
  })
}catch(e){
  res.json({
    "message":"error occured"
  })
}
});
  

app.listen(3001);
