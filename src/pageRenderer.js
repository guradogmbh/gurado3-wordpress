import React from 'react';
import { useLocation } from 'react-router-dom';
import RegisterForm from './components/Auth/registerForm';
import LoginForm from './components/Auth/LoginForm';
import ForgetPasswordForm from './components/Auth/ForgetPasswordForm';
import VerifyForm from './components/Auth/VerifyForm';


   const PageRenderer = () => {
     const location = useLocation();
     console.info("the page Renderer is as follow=>",location,location.pathname);

     // Render different shortcode components based on the route
     const renderPage = () => {
       switch (location.pathname) {
         case '/':
           return <RegisterForm />;
         case '/login':
           return <LoginForm />;
         case '/forget-password':
           return <ForgetPasswordForm />; 
         // Add more cases for other pages
         default:
           return <RegisterForm />;
       }
     };

     return <div>{renderPage()}</div>;
   };

   export default PageRenderer; 
