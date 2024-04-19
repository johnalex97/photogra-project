import React, { useState, useEffect }  from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import axios from "axios";

export const Sections = (props) => {
    const navigate = useNavigate();
    const handleOnClick = () => navigate('/gallery/:galleryId');

    const [sections, setSections] = useState([]);

    useEffect(() => {
      const instance = axios.create({baseURL: 'http://localhost:5000'})
      instance.get("/api/sections")
        .then(response => setSections(response.data))
        .catch(error => console.error(error));
    }, []);

    console.log(sections);
  const sectionElements = sections.map((sec, index)=>
    <div class="grid grid-cols-2 gap-2" >

        { index % 2 ==0 &&
                <><div>
                    <Link to={`gallery/${sec.name.toLowerCase()}`} className='text-blue-600 underline'>
                        <img class="h-auto max-w-full rounded-lg" src={sec.largeImage} alt="" />
                    </Link>
                </div>
                    
                        <div class="flex">
                            <div class="m-auto cursor-pointer">
                                <Link to={`gallery/${sec.name.toLowerCase()}`}>
                                    <h3 class="text-6xl font-bold">{sec.name}</h3>
                                </Link>
                                <button>leyenda</button>
                            </div>
                        </div>
                    
                </>
        }

        { index % 2 == 1 &&
            <><div class="flex">
                  <div class="m-auto cursor-pointer">
                    <Link to={`gallery/${sec.name.toLowerCase()}`}>
                        <h3 class="text-6xl font-bold">{sec.name}</h3>
                    </Link>
                    <button>leyenda</button>
                  </div>
              </div><div>
                    <Link to={`gallery/${sec.name.toLowerCase()}`} className='text-blue-600 underline'>
                      <img class="h-auto max-w-full rounded-lg object-contain"  src={sec.largeImage} alt="" />
                    </Link>
                  </div></>
        }

    </div>
    );

    return sectionElements;
};