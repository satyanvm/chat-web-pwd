"use client";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import * as axios  from "axios";
import * as React from "react";
import {useState} from "react";

export default function SignIn() {

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
                <Button children="Submit" appName="submit" onClick={async () => {
                    try{ 
                   const response = await axios.post('/signin', {
                    username: username,
                    password: password
                   }); 
                   if(response && response.status == 200){
                    //@ts-ignore
                        const {token} = response.data; 
                        localStorage.setItem('authToken', token);
                        router.push('/enter-room');
                   }
                   return response.data;
                } catch(e){
                    console.log("error in signin", e);
                    return;
                }
                }} 
                /> 
        </div>
    )
}