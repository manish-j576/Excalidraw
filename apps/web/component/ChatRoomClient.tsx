"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { unique } from "next/dist/build/utils";

interface propsTypes {
    messages : string[],
    id : string

}

export default function ChatRoomClient(props : propsTypes){
    const [chats , setChats] = useState(props.messages)
    const {socket , loading} = useSocket();
    const inputRef = useRef()
    function onclickHandler(){

        const value = inputRef.current?.value
        socket?.send(JSON.stringify({
            "type":"chat",
            "payload":{
                "message": value,
                "roomId": props.id
            }
        }))
        if(!inputRef.current){
            return
        }
        inputRef.current.value = ""
    }
    useEffect(()=>{

        if(socket && !loading){

            socket.send(JSON.stringify({
                "type":"join_room",
                "payload":{
                    "roomId": props.id
                }
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data)
                if(parsedData.type === "chat"){
                    setChats( c => [...c,parsedData.payload.message])
                     
                }

            }
        }
    })
    chats.map(e => {
        console.log(e)
    })

    return <div>
        {chats.map(e => <div key={e.id}>{e.message}</div> )}
        <input ref={inputRef} type="text" />
        <button onClick={onclickHandler}>Send message</button>
    </div>
}