import React from "react";
import './App.css';
import './styles/tailwind.css';
import './styles/tailwindoutput.css';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/navbar';
import { Footer } from './components/footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
