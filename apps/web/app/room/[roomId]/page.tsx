import { prismaClient } from 'db/client'
import ChatRoomClient from '../../../components/ChatRoomClient';
import * as jwt from "jsonwebtoken";
interface PageProps{
    params: { 
        roomId: number
    }
}

export default async function ChatRoom({ params }: PageProps){
    const { roomId } = await params;
    const token = localStorage.getItem('authToken');
    if(!token){
        console.log("Token is missing");
        return;
    }
    const userIdJwt: any = jwt.decode(token);
    if(!userIdJwt){
        console.log("Decoded token not found");
        return;
    }
    const userId = parseInt(userIdJwt);
    const messages = await prismaClient.room.findMany({
        where: {
            id: roomId
        }
    })
    return (
        <div>
             <ChatRoomClient userId = {userId} messages={messages} id = {roomId}/>
        </div>
    )
}