import axios from "axios"
import { BACKEND_URL } from "../../config"
import ChatRoom from "../../../component/ChatRoom"


async function getRoomId(slug : string){
    const respose  = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return respose.data.data.id
}

export default async function ChatRoom1({params}:{
    params : {
        slug : string
    }
}){

    const slug = (await params).slug
    const roomId = await getRoomId(slug)
    
    return <ChatRoom id={roomId}></ChatRoom>
}