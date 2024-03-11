import logo from './logo.svg';
import './App.css';
import './styles/tailwind.css';
import './styles/tailwindoutput.css';

import { NavBar } from './components/navbar';
import { Sections } from './components/sections';
import { HeroSections } from './components/herosection';

function App() {
  return (
    <div className="App">
      <NavBar />
      <HeroSections />
      <Sections />
    </div>
  );
}

export default App;
