import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config"


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
    
    socket.on('message', function message(data) {
    socket.send('something');
  });

});