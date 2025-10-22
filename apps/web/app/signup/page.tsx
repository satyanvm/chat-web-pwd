import { Button } from "@repo/ui/button";
import axios from 'axios'
import { useRouter } from "next/router";
import { useState } from "react";

export default function signup(){

    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
      };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };

    return (
        <div>
            <label htmlFor= "username">Username</label>
            <input 
                type = "text"
                placeholder="Enter your username"
                name = "username"
                id = "username"
                onChange={handleUsernameChange}
                />
            <label htmlFor="password">Password</label>
            <input
                type = "text"
                placeholder="Enter your password"
                name = "password"
                id = "password"
                onChange={handlePasswordChange}
                />
                <Button appName="submit" onClick={async () => {
                    try{
                   const response = await axios.post('/signup', {
                    username: username,
                    password: password
                   });
                   if(response && response.status == 200){
                    //@ts-ignore
                        const {token} = response.data;
                        localStorage.setItem('authToken', token);
                        router.push('/chat');
                   }
                   return response.data;
                } catch(e){
                    console.log("error in signup", e);
                    return;
                }
                }} 
                > Submit </Button>
        </div>
    )
}