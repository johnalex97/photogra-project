import React, { useState, useEffect, useContext }  from "react";
import { AuthContext } from "./authContext";
import { Link, Navigate } from "react-router-dom";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import axios from "axios";

export const Portafolio = () => {
    const { token } = useContext(AuthContext);
    
    const { userId } = useContext(AuthContext);
    const [ images, setImages ] = useState([]);

    const imgs = [];
    images.map((arr) => {
        arr.map((i) => { imgs.push(i)});
    });

    useEffect(() => {
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/images/`,
            data : { userId: userId }
        })
        .then((response) => setImages(response.data))
        .catch(error => console.error(error));
    }, []);

    if (!token){
        return <Navigate to="/login" />;
    }
    return (
         <div>
            { imgs.length > 0 &&
            <div>
                <div>
                    <p class="my-10 text-6xl font-bold">Mi Portafolio</p>
                </div>
                <div className="m-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {imgs.map((img, index) => (
                            <div key={index} className="relative">
                                <Link to={`/carrousel/${img.section.toLowerCase()}`}>
                                    <img
                                        className="h-full w-full max-w-full rounded-none object-cover object-center"
                                        src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${img.name}`}
                                        alt={`gallery-photo ${index}`}
                                    />
                                    <div className="bg-red-600 absolute text-white left-0 top-0 mt-2 ml-2 p-2 rounded">
                                        {img.section}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
        </div>
      );
};
