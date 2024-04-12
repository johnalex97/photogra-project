import React, { useState, useEffect }  from "react";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';
import axios from "axios";

export const Sections = (props) => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
      const instance = axios.create({baseURL: 'http://localhost:5000'})
      instance.get("/api/sections")
        .then(response => setSections(response.data))
        .catch(error => console.error(error));
    }, []);

    console.log(sections);
  return (
    <div class="grid grid-cols-2 gap-2">
        <div>
            <img class="h-auto max-w-full rounded-lg" src={props.data ? (props.data.food ? props.data.food.largeImage : "Loading") : ""} alt=""/>
        </div>
        
        <div class="flex">
            <div class="m-auto">
                <h3 class="text-6xl font-bold">Alimentos</h3>
                <button>leyenda</button>
            </div>
        </div>

        <div class="flex">
            <div class="m-auto">
                <h3 class="text-6xl font-bold">Retratos</h3>
                <button>leyenda</button>
            </div>
        </div>

        <div>
            <img class="h-auto max-w-full rounded-lg object-contain" src={props.data ? (props.data.portrait ? props.data.portrait.largeImage : "Loading"): ""} alt=""/>
        </div>

        <div>
            <img class="h-auto max-w-full rounded-lg" src={props.data ? (props.data.product ? props.data.product.largeImage : "Loading") : ""} alt=""/>
        </div>

        <div class="flex">
            <div class="m-auto">
                <h3 class="text-6xl font-bold">Productos</h3>
                <button>leyenda</button>
            </div>
        </div>

        <div class="flex">
            <div class="m-auto">
                <h3 class="text-6xl font-bold">Naturaleza</h3>
                <button>leyenda..</button>
            </div>
        </div>

        <div>
            <img class="h-auto max-w-full rounded-lg" src={props.data ? (props.data.nature ? props.data.nature.largeImage : "Loading") : ""} alt=""/>
        </div>
    </div>
    );
};