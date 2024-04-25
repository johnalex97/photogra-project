import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./authContext";
import { useAuth  } from './authContext';
import '../styles/tailwind.css';
import '../styles/tailwindoutput.css';

export const NavBar = () => {
  //const [modalShow, setModalShow] = useState(false);
  const auth = useAuth();
  const { userName, userId } = useContext(AuthContext);
  
  const baseURL = process.env.REACT_APP_BASE_URL;
  const currentURL = window.location.href;
  console.log(baseURL);
  console.log(currentURL);
  return (
<nav class="flex c items-center justify-between flex-wrap bg-gray-100 p-6">
  
    <div class="flex grow h-14 items-center flex-shrink-0 text-white mr-6">
    <Link to={`/`}>
      <svg class="fill-current h-5 w-5 m-2" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve"><g> <path fill="#231F20" d="M60,10H49.656l-6.828-6.828C42.078,2.422,41.062,2,40,2H24c-1.062,0-2.078,0.422-2.828,1.172L14.344,10H4 c-2.211,0-4,1.789-4,4v44c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V14C64,11.789,62.211,10,60,10z M32,50 c-8.836,0-16-7.164-16-16s7.164-16,16-16s16,7.164,16,16S40.836,50,32,50z"/> <circle fill="#231F20" cx="32" cy="34" r="8"/> </g></svg>
      </Link>
      <Link to={`/`}>
        <span class="font-semibold text-xl text-black">Photohub</span>
        </Link>
      
    </div>

  <div class="block c lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-black border-teal-400 hover:text-indigo-600 hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="grow-0 block lg:flex lg:items-center">
    <div class="text-sm lg:flex-grow">
      <a href={baseURL+'/gallery/portraits'} class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-600 mr-4">
        Retrato
      </a>
      <a href={baseURL+'/gallery/nature'} class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-600 mr-4">
        Naturaleza
      </a>
      <a href={baseURL+'/gallery/food'} class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-600 mr-4">
        Alimentos
      </a>
      <a href={ baseURL+'/gallery/products'} class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-indigo-600 mr-4">
        Productos
      </a>
      { userId !== null &&
      <>
          <Link to={`/portafolio`} className="block mt-4 text-indigo-600 font-bold lg:inline-block lg:mt-0 text-black hover:text-indigo-600 text-bold mr-4">
            Mi Portafolio
          </Link>
          
          <Link to={`/user/messages/`} className="block mt-4 text-indigo-600 font-bold lg:inline-block lg:mt-0 text-black hover:text-indigo-600 text-bold">
            Mensajes
          </Link>
          
        </>
      }
    </div>
  </div>
  <div class="grow">
      { userName === null &&
        <div>
          <Link to={`/login`} className="bg-indigo-600 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0">
            Entrar
          </Link>
          <Link to={`/signup`} className="bg-red-600 ml-2 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0">
            Crear Cuenta
          </Link>
        </div>
      }
      { userName !== null &&
      <div className=" md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
        <Link onClick={() => auth.logOut()} className="ml-2 bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0">
          salir
        </Link>
        <Link to={`/portafolio/upload`} className="bg-indigo-600 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded mt-4 lg:mt-0">
          Subir una foto
        </Link>


        <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex mr-4">
          <a className="flex font-bold">{userName}</a>
          <Link to={`/portafolio`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          </Link>
        </div>

      </div>
      }
  </div>
</nav>
  );
};
