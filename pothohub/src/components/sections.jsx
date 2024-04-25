import React, { useState, useEffect }  from "react";
import { Link } from "react-router-dom";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import axios from "axios";

export const Sections = (props) => {

    const [sections, setSections] = useState([]);
    useEffect(() => {
      const instance = axios.create({baseURL: process.env.REACT_APP_BACKEND_BASE_URL})
      instance.get("/api/sections")
        .then(response => setSections(response.data))
        .catch(error => console.error(error));
    }, []);

    const sectionElements = sections.map((sec, index)=>
        <div class="grid grid-cols-2 gap-0" >
                { index % 2 == 0 &&
                    <><div id={sec.name.toLowerCase()} className="overflow-hidden">
                        <Link to={`gallery/${sec.name.toLowerCase()}`}>
                            <img class="h-auto max-w-full rounded-none scale-110 transition-all duration-300 hover:scale-100" src={sec.largeImage} alt="" />
                        </Link>
                    </div>
                        
                            <div class="flex">
                                <div class="m-auto cursor-pointer">
                                    <Link to={`gallery/${sec.name.toLowerCase()}`}>
                                        <h3 class="text-6xl font-bold">{sec.displayname}</h3>
                                    </Link>
                                    <a className="block w-2/3 m-auto pt-4">{ sec.description }</a>
                                </div>
                            </div>
                        
                    </>
            }

            { index % 2 == 1 &&
                <><div class="flex">
                    <div id={sec.name.toLowerCase()} class="m-auto cursor-pointer">
                        <Link to={`gallery/${sec.name.toLowerCase()}`}>
                            <h3 class="text-6xl font-bold">{sec.displayname}</h3>
                        </Link>
                        <a className="block w-2/3 m-auto pt-4">{ sec.description }</a>
                    </div>
                </div><div className="overflow-hidden">
                        <Link to={`gallery/${sec.name.toLowerCase()}`}>
                        <img class="h-auto max-w-full rounded-none scale-110 transition-all duration-300 hover:scale-100"  src={sec.largeImage} alt="" />
                        </Link>
                    </div></>
            }

        </div>
    );

    return (
        <div className="m-14">
            { sectionElements }
        </div>
        );
};