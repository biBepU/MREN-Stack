import {
    Navigate,
    RouterProvider,
      createBrowserRouter,
   
    } from "react-router-dom";
    
import App from '../App'
import Home from '../pages/Home'
import About from "../pages/About";
import Contact from "../pages/Contact";
import ReceipeForm from "../pages/ReceipeForm";

  
    
    
    export default function index() {
  
      const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          children :[
            {
              path : "/",
              element : <Home/> 
            },
          
         
            {
              path : "/about",
              element : <About/> 
            },
            {
                path : "/contact",
                element : <Contact/> 
            },
            {
              path : "/receipe/create",
              element : <ReceipeForm/> 
            },
            {
              path : "/receipe/edit/:id",
              element : <ReceipeForm/> 
            },
       
       
         
          
          
          ]
        },
      ]);
     
      return (
        <RouterProvider router={router} />
      )
    }
    
  
   