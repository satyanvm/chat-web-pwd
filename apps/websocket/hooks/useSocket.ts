import { useEffect, useState } from "react";


export function useSocket(){
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080')
        ws.onopen = () => {
            
        }
    })
}
const ws = new WebSocket('ws://localhost:8080');
