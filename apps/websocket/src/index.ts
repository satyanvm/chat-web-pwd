import { WebSocket, WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
import jwt from 'jsonwebtoken'
import { response } from 'express';
interface User{
    ws: WebSocket,
    userId: string,
    rooms: Number[]
    }
    const users: User[] = []

function checkUser(token: string){
    const JWT_SECRET = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, JWT_SECRET);
    if(typeof decoded == 'string' || !decoded || !decoded.userId){
        return null;
    }
    return decoded.userId;
}

wss.on('connection', function connection(ws: WebSocket, request: any){
    
    const url = request.url;
    if(!url){
        console.log("Returning because of no url being found");
        return; 
    } 
    const token: string = new URLSearchParams(url.split("?")[1]).toString();
    const userId = checkUser(token); 

    if(!userId){
        console.log("could not find decoded or decoded.userId")
        ws.close()  
        return;  
    }    

        if(!userId){
        console.log("could not find decoded or decoded.userId")
        ws.close()  
        return;  
    }    

    users.push({ 
        userId: userId, 
        ws: ws,
        rooms: [],
    });

    ws.on('message', function message(data){
    let parsedData;
        if(typeof data !== 'string'){
           parsedData = JSON.parse(data.toString());
        } else{
           parsedData = JSON.parse(data);
        }
    const messageType = parsedData.type;
    if(messageType == 'join_room'){
        users.push({
            ws: ws,
            userId: parsedData.userId,
            rooms: parsedData.roomId
        })
    }
    if(messageType == 'chat'){
        users.forEach(user => {
            if(user.rooms.includes(parsedData.roomId)){
                user.ws.send(JSON.stringify({
                    type: "chat",
                    message: parsedData.message,
                    roomId: parsedData.roomId
                }))
            }
        })
    }
    })
})
