import { useParams } from "react-router-dom";
import React, { useState, useEffect }   from "react";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import {
    FacebookShareButton,
  } from "react-share";

export const ImageView = (props) => {
    const { name } = useParams();

    const [user, setUser] = useState([]);

    useEffect(() => {
        const instance = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL})
        instance.get(`/api/image/user/${name}`)
          .then((response) => setUser(response.data))
          .catch(error => console.error(error));
      }, []);

    if(!user) return null;

    return (
        <div className="container relative m-8">
            <img
                className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
                src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${name}`}
                alt="nature image"
            />

            <div>
                <div className="h-20 z-20 absolute top-0 left-0">
                    <FacebookShareButton url={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${name}`} />
                </div>

                <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                    <div>
                    <Typography className="text-black font-bold text-center text font-xs bold">
                         Te gusta el trabajo de {user.name}? Contactalo a 
                         <a className="pl-2 text-red-600" href={`mailto:${user.email}?subject=Hola ${user.name}`}>{user.email}</a>
                    </Typography>
                    </div>
                </figcaption>
            </div>
        </div>
      );
};
