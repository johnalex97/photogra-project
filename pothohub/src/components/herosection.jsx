import React from "react";

export const HeroSections = (props) => {
  return (
        <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden mb-24">
        <div class="absolute inset-0">
        <img src={props.data ? (props.data.hero ? props.data.hero.largeImage : "Loading") : ""} alt="Background Image" class="object-cover object-center w-full h-full" />
        <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 class="text-7xl font-bold leading-tight mb-4">Aventura Visual</h1>
        <p class="text-2xl text-gray-300 mb-8">La fotografía es la literatura del ojo</p>
        
        </div>
    </div>
    );
};