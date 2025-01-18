import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from '../config';


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(socket , Request) {
    const url = Request.url // ws://localhost:3000?token=123123
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split('?')[1]) // quweyparam => token =123123
    const token = queryParams.get('token') ?? "";

    const decode = jwt.verify(token , JWT_SECRET)

    if(!decode || !(decode as JwtPayload).userId){
        socket.close();
        return ;
    }


    socket.on('message', function message(data) {
    socket.send('something');
  });

});