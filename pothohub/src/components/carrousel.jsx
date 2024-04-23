import React, { useState, useEffect }  from "react";
import { Carousel,IconButton  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import axios from "axios";


export const Carrousel = (props) => {

    const [sections, setSections] = useState([]);
    const { galleryId } = useParams();
    const images = sections.images;

    useEffect(() => {
      const instance = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL})
      instance.get(`/api/sections/${galleryId}`)
        .then((response) => setSections(response.data))
        .catch(error => console.error(error));
    }, [setSections]);

    
    if(images === undefined) return null;

    return (
        <div className="my-8 max-h-screen h-screen">
            <Carousel transition={{ duration: 2, type: "tween" }} loop={true} className="rounded-s">
           
                
                    {
                        images.map((img, index) => (
                            <div className="container relative m-8">
                                <Link to={`/image/${img.name}`}>
                                    <img
                                        src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${img.name}`}
                                        alt={`image ${index}`}
                                        className="h-full w-full object-cover"
                                    />
                                </Link>
                                <div className="absolute right-4 top-4">
                                    <Link to={`/image/${img.name}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }                
            </Carousel>
        </div>
      );
};
