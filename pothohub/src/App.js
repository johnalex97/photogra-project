import logo from './logo.svg';
import './App.css';
import './styles/tailwind.css';
import './styles/tailwindoutput.css';

import { NavBar } from './components/navbar';
import { Sections } from './components/sections';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Sections />
    </div>
  );
}

export default App;
