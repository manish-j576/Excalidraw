import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"
import { WebSocket } from 'ws';

interface User {
    userId  : String | null,
    rooms   : String[],
    socket  : WebSocket
}

const users : User [] = []

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token : String): String | null {
    try{
    const decode = jwt.verify(token as string,JWT_SECRET)
    if(!decode){
        return null
    }
    return (decode as JwtPayload).id
    }catch(e){
        console.log("invalid token")
        return null
    }
}



wss.on('connection', function connection(socket , Request) {
    try{
    const url = Request.url // ws://localhost:3000?token=123123
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]) // quweyparam => token =123123
    const token = queryParams.get('token') ?? "";
   
    const userId = checkUser(token) // will return either the user id if the token is correct or null
    if(!userId){
        socket.send("invalid token")
        socket.close()
    }
    // whenever a user is connect 
    users.push({
        userId,
        rooms:[],
        socket
    })
    
    socket.on('message', function message(data) {
          const parsedData = JSON.parse(data as unknown as string)
          const roomId = parsedData.payload.roomId
          
          if(parsedData.type == "join_room"){
            const user = users.find( x => x.socket == socket)
            user?.rooms.push(roomId)
          }

          if(parsedData.type == "leave_room"){
            const user = users.find(x => x.socket == socket)
            if(!user){
                return
            }
            user.rooms = user.rooms.filter(x => x === JSON.stringify(roomId))
          }

          if(parsedData.type == "chat"){
            const room = parsedData.payload.roomId
            const message = parsedData.payload.message
            users.forEach( e => {
                if(e.rooms.includes(room)){
                    e.socket.send(JSON.stringify({
                        type : "chat",
                        payload  : {
                            message,
                            room
                        }
                    }))
                }
            })
          }
  });
    }catch(e){
        socket.send("error occured")
    }
});