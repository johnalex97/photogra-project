import React, { useState, useEffect }  from "react";
import { Typography } from "@material-tailwind/react";
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
                    <figure  className="relative" key={index}>
                        <Link to={`/carrousel/${img.section.toLowerCase()}`}>
                            <img
                                className="h-full w-full max-w-full rounded-none object-cover object-center "
                                src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${img.name}`}
                                alt={`gallery-photo ${index}`}
                            />
                            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                <div>
                                <Typography className="text-indigo-600 font-xs bold">
                                    {img.userName}
                                </Typography>
                                <Typography color="gray" className="mt-2 font-normal">
                                    {new Date(img.creationDate).toLocaleDateString()}
                                </Typography>
                                </div>
                                <Typography variant="h8" color="blue-gray">
                                    {img.caption}
                                </Typography>
                            </figcaption>
                        </Link>
                    </figure >
                ))}
            </div>
        </div>
      );
};
