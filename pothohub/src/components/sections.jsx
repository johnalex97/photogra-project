import React from "react";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';

export const Sections = (props) => {
  return (
    <div class="grid grid-cols-2 gap-2">
        <div>
            <img class="h-auto max-w-full rounded-lg" src={props.data.food ? props.data.food.largeImage : "Loading"} alt=""/>
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
            <img class="h-auto max-w-full rounded-lg object-contain" src={props.data.portrait ? props.data.portrait.largeImage : "Loading"} alt=""/>
        </div>

        <div>
            <img class="h-auto max-w-full rounded-lg" src={props.data.product ? props.data.product.largeImage : "Loading"} alt=""/>
        </div>

        <div class="flex">
            <div class="m-auto">
                <h3 class="text-6xl font-bold">Productos</h3>
                <button>leyenda</button>
            </div>
        </div>

    </div>
    );
};