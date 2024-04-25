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
        .then((response) => {
            setMessages(response.data);
        })
        .catch(error => console.error(error));
    }, []);

    console.log(typeof(messages));
    if(Object.keys(messages).length == 0) return <div>No se encontraron mensages</div>;

    return (
        <div className="m-8 ">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {messages.map((message, index) => (
                    <div class="ml-8 max-w-sm w-full lg:max-w-full lg:flex">
                        <div class="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                            <div class="mb-8">
                                <div class="text-left text-gray-900 font-bold text-xl mb-2">{message.sender}</div>
                                <p class="text-gray-700 text-left">{message.body}</p>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="text-gray-900 leading-none text-left">{message.email}</p>
                                    <p class="text-gray-600 text-left">{new Date(message.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
};
