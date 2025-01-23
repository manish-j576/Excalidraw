import express, { Request, Response } from "express";
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
app.post("/room", middleware,async (req : Request, res : Response) => {

  try{

    // logic to create a room and let people join it
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
      res.json({
      "message":"Incorrect inputs"
    })
    return
  }
  console.log("Conrol reach 1st end point")
  //@ts-ignore
  const userId = req.userId; 
   // if the control reaches here mtlv it is an authenticated user aur middleware ne id daal di hogi yaha
   console.log(userId  + typeof userId )

   try{

     const room = await prismaClient.room.create({
       data : {
         slug : parsedData.data.room, //name of the room given by the user
         adminId : userId
         
        }
      })
      console.log("Conrol reach 3 end point")
      res.json({
        roomId : room.id
      })
    }catch(e){
      res.json({
        "message":"room already exist"
      })
    }


}catch(e){
  res.json({
    "message":"error occured"
  })
}
});
  

app.get("/chats/:roomId",async (req,res)=>{

  try{

    const roomId = Number(req.params.roomId)
    const data  = await prismaClient.chat.findMany({
    where:{
      roomId: roomId
    },
    orderBy:{
      id:"desc"
    },
    take: 50
  })
  
  res.json({
    data
  })
}catch(e){
  res.json({
    "message":"error occured"
  })
}
})

app.get("/room/:slug",async (req , res) =>{
  try{
    const slug = req.params.slug
    const data = await prismaClient.room.findFirst({
      where:{
        slug : slug
      }
    })
    res.json({
      data
    })
  }catch(e){
    res.json({
      "message":"error occured"
    })
  }
})

app.listen(3001);
