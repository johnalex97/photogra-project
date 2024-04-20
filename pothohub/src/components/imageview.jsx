import { useParams } from "react-router-dom";
import React  from "react"
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import {
    FacebookShareButton,
  } from "react-share";

export const ImageView = (props) => {
    const { name } = useParams();
    return (
        <div className="container relative m-8">
            <img
                className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
                src={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${name}`}
                alt="nature image"
            />
            <div className="h-20 z-20 absolute top-0 left-0">
                <FacebookShareButton url={`${process.env.REACT_APP_BACKEND_BASE_URL}/api/images/${name}`} />
            </div>
        </div>
      );
};
