import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import axios from "axios";


export const Gallery = (props) => {

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
        <div className="m-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {images.map((img, index) => (
                    <div key={index}>
                        <Link to={`/carrousel/${img.section.toLowerCase()}`}>
                            <img
                                className="h-full w-full max-w-full rounded-none object-cover object-center"
                                src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${img.name}`}
                                alt={`gallery-photo ${index}`}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      );
};
