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
    const token = localStorage.getItem('authorization');
    if(!token){
        console.log("Token is missing");
        return;
    }
    const userId = jwt.decode(token);
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