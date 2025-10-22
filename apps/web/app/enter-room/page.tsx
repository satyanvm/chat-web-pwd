import { Button } from "@repo/ui/button";
import { useState } from "react"

export default function JoinRom(){

    const [roomId, setRoomId] = useState<number>();

    const handleSubmit = () => {
        if(roomId){
            window.location.href = `http://localhost:3000/chat/${roomId}`
        } else{
            console.log("Room id is not avaialable");
            return;
        }
    }
    return (
        <div>
            <input type = "number" placeholder="Enter room id you would like to join" onChange = {(e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
        setRoomId(value);
    }
}}/>
            <Button onClick ={handleSubmit}>Submit</Button>
        </div>
    )
}