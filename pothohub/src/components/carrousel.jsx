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
            {images.map((img, index) => (
                 <Link to={`/image/${img.name}`}>
                    <img
                        src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${img.name}`}
                        alt={`image ${index}`}
                        className="h-full w-full object-cover"
                    />
                </Link>
            ))}
            </Carousel>
        </div>
      );
};
