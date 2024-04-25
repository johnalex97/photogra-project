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
    let images = sections.images;

    useEffect(() => {
        const galTranslation = {'portraits':'Retratos','nature':'Nature','products':'Products','food':'Alimentos'};
        document.title = `Galeria | ${galTranslation[galleryId]}`;

      const instance = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL})
      instance.get(`/api/sections/${galleryId}`)
        .then((response) => setSections(response.data))
        .catch(error => console.error(error));
    }, [setSections]);

    
    if(images === undefined) return null;

    const reversedImages = []
    for(let i = images.length - 1; i >= 0; i--) {
        const valueAtIndex = images[i]
        reversedImages.push(valueAtIndex)
    }

    return (
            <div className="m-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {reversedImages.map((img, index) => (
                        <figure  className="relative" key={index}>
                            <Link to={`/carrousel/${img.section.toLowerCase()}`}>
                               <a class="group">
                                <img
                                    className="group-hover:opacity-90 inset-0 h-full w-full max-w-full rounded-none object-cover object-center"
                                    src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${img.name}`}
                                    alt={`gallery-photo ${index}`}
                                />
                                <div className="transition-all transform 
                                    translate-y-8 opacity-0 
                                    group-hover:opacity-100 
                                    group-hover:translate-y-0">

                                    <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                    
                                        <div>
                                            <Typography className="text-indigo-600 font-xs bold">
                                            <a href={`/user/contact/${img.userName}`}>
                                                {img.userName}
                                            </a>
                                            </Typography>
                                            <Typography color="gray" className="mt-2 font-normal">
                                                {new Date(img.creationDate).toLocaleDateString()}
                                            </Typography>
                                        </div>
                                        <Typography variant="h8" color="blue-gray">
                                            {img.caption}
                                        </Typography>
                                    
                                    </figcaption>
                                </div>
                            </a>
                            </Link>
                        </figure >
                    ))}
                </div>
            </div>
      );
};
