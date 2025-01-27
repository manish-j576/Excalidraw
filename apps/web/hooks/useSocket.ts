import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading , setLoading] = useState(true)
    const [socket , setSocket] = useState<WebSocket>()

    useEffect(()=>{
        const ws = new WebSocket(WS_URL+"?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmlzaEpvc2hpQDEyMyIsImlkIjo0LCJpYXQiOjE3Mzc5ODAxODJ9.JQCFQeqRzmtBthOI9S1m33WZfip94qW-AGTfrGJo_6w")
        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }
    },[])
    return {
        loading,
        socket
    }
}