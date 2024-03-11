import React from "react";
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';

export const NavBar = (props) => {
  return (
<nav class="flex c items-center justify-between flex-wrap bg-teal-700 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
  <svg class="fill-current h-5 w-5 m-2" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve"><g> <path fill="#231F20" d="M60,10H49.656l-6.828-6.828C42.078,2.422,41.062,2,40,2H24c-1.062,0-2.078,0.422-2.828,1.172L14.344,10H4 c-2.211,0-4,1.789-4,4v44c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V14C64,11.789,62.211,10,60,10z M32,50 c-8.836,0-16-7.164-16-16s7.164-16,16-16s16,7.164,16,16S40.836,50,32,50z"/> <circle fill="#231F20" cx="32" cy="34" r="8"/> </g></svg>
    <span class="font-semibold text-xl tracking-tight">Photohub</span>
  </div>
  <div class="block c lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Alimentos
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Retratos
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Productos
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Fotografos
      </a>
    </div>
    <div>
      <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
    </div>
  </div>
</nav>
  );
};
