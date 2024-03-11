import React from "react";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';

export const Sections = (props) => {
  return (
    <div class="grid grid-cols-2 gap-2">
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
        </div>
        
        <div class="flex">
            <div class="m-auto">
                <h3 class="text-2xl font-bold">Alimentos</h3>
                <button>leyenda</button>
            </div>
        </div>

        <div class="flex">
            <div class="m-auto">
                <h3 class="text-2xl font-bold">Retratos</h3>
                <button>leyenda</button>
            </div>
        </div>

        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
        </div>

        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
        </div>

        <div class="flex">
            <div class="m-auto">
                <h3 class="text-2xl font-bold">Productos</h3>
                <button>leyenda</button>
            </div>
        </div>

    </div>
    );
};