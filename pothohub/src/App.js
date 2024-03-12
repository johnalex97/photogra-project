import React, { useState, useEffect } from "react";
import './App.css';
import './styles/tailwind.css';
import './styles/tailwindoutput.css';

import { NavBar } from './components/navbar';
import { Sections } from './components/sections';
import { HeroSections } from './components/herosection';
import { Footer } from './components/footer';
import JsonData from "./data/data.json";

function App() {

  const [siteData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
    <div className="App">
      <NavBar />
      <HeroSections data={siteData.images} />
      <Sections data={siteData.images}/>
      <Footer />
    </div>
  );
}

export default App;
