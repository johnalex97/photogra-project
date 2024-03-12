import React from "react";

export const HeroSections = (props) => {
  return (
        <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden mb-24">
        <div class="absolute inset-0">
        <img src={props.data ? (props.data.hero ? props.data.hero.largeImage : "Loading") : ""} alt="Background Image" class="object-cover object-center w-full h-full" />
        <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 class="text-7xl font-bold leading-tight mb-4">Bienvenido</h1>
        <p class="text-2xl text-gray-300 mb-8">Descubre increibles imagenes.</p>
        <a href="#" class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Vamos</a>
        </div>
    </div>
    );
};