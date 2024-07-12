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
import SignUpForm from '../pages/SignUpForm'
import SignInForm from '../pages/SignInForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect, useState } from "react";
import UserManage from "../pages/UserManage";
import ReceipeDetails from "../pages/ReceipeDetails";
import UserProfile from "../components/UserProfile";
  
    
   

    export default function Index() {
      let {user}= useContext(AuthContext)
      const [isAdmin, setIsAdmin] = useState(false);
      useEffect(() => {
        if (user && user.role === 'admin') {
            setIsAdmin(true);
        }
    }, [user]);
      const router = createBrowserRouter([
        {
          path: "/",
          element: <App/>,
          children :[
            {
              path : "/",
              element : user? <Home/> : <Navigate to='/sign-in'/>
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
              element :user? <ReceipeForm/> : <Navigate to={'/sign-in'}/>
            },
            {
              path : "/receipe/edit/:id",
              element : <ReceipeForm/> 
            },
            {
              path : "/sign-up",
              element : !user? <SignUpForm/> : <Navigate to={'/'}/>
            },
            {
              path : "/sign-in",
              element :! user? <SignInForm/> : <Navigate to={'/'}/>
            },
            {
              path : "/usermanage",
              element: isAdmin ? <UserManage /> : <Navigate to="/" />
            },
            {
              path : "/user-profile",
              element : user? <UserProfile/> : <Navigate to={'/'}/>
            },
            {
              path : "/receipe/receipeDetails/:id",
              element : <ReceipeDetails/> 
            },
       
       
         
          
          
          ]
        },
      ]);
     
      return (
        
          
            <RouterProvider router={router} />
          
         
      
      )
    }
    
  
   