import React, { useState, useEffect, useContext }  from "react";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import { AuthContext } from "./authContext";
import axios from "axios";


export const Messages = () => {

    const [messages, setMessages] = useState([]);
    const {  userId } = useContext(AuthContext);

    useEffect(() => {
      const instance = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL})
      instance.get(`/api/messages/user/${userId}`)
        .then((response) => setMessages(response.data))
        .catch(error => console.error(error));
    }, []);

    
    if(messages === undefined) return <div>No se encontraron mensages</div>;

    return (
        <div className="m-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {messages.map((message, index) => (
                    <div className="relative">
                            <div>
                                from: {message.email}
                            </div>
                            <div>
                                {message.body}
                            </div>
                    </div>
                ))}
            </div>
        </div>
      );
};
