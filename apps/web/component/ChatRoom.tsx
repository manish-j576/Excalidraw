import axios from "axios"
import { BACKEND_URL } from "../app/config"
import ChatRoomClient from "./ChatRoomClient"




async function getExistingChats(roomId:number) {
    const response = await axios.get(`${BACKEND_URL}/chats/`+roomId)
    

    return response.data.messages

    
}

export default async function ChatRoom(id : number) {
    const messagesBackend = await getExistingChats(id.id)

    console.log(messagesBackend)
    return <ChatRoomClient messages={messagesBackend} id={id.id} />
}