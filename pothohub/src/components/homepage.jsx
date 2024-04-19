import React from "react";
import JsonData from "../data/data.json";
import { useState, useEffect } from "react";
import { HeroSections } from './herosection';
import { Sections } from './sections';


export const HomePage = (props) => {

    const [siteData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

  return (
        <div>
            <HeroSections data={siteData.images} />
            <Sections data={siteData.images}/>
        </div>
    );
};