import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorPage } from './components/errorpage';
import { HomePage } from './components/homepage';
import { Gallery } from './components/gallery';
import { Carrousel } from './components/carrousel';
import { ImageView } from './components/imageview';
import { Login } from './components/loginForm';
import { Registration } from './components/registration';
import { AuthProvider } from './components/authContext';
import { Portafolio } from './components/portafolio';
import { MyAccountUpload } from './components/myaccountupload';
import { Contact } from './components/contact';
import { Messages } from './components/messages';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{
      index: true,
      element: <HomePage />,
    },
    {
      path: "gallery/:galleryId",
      element: <Gallery />,
    },
    {
      path: "/carrousel/:galleryId",
      element: <Carrousel />,
    },
    {
      path: "/image/:name",
      element: <ImageView />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Registration />,
    },
    {
      path: "/portafolio",
      element: <Portafolio />,
    },
    {
      path: "/portafolio/upload",
      element: <MyAccountUpload />,
    },
    {
      path: "/user/contact/:artistEmail",
      element: <Contact />,
    },
    {
      path: "/user/messages",
      element: <Messages />,
    },
  ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
