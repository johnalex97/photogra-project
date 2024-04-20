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
  ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
