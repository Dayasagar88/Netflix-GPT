import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from './Utils/UserSlice';
import { auth } from './Utils/Firebase';
import React, { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainPage from './Components/MainPage';
import Login from './Components/Login';
import Browse from './Components/Browse';
import GetStarted from './Components/GetStarted';


function App() {
  const dispatch = useDispatch();

  

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
       if (user) {
         const { uid, email, displayName, photoURL } = user;  
         console.log("Tushar") 
         dispatch(
           addUser({
             uid: uid,
             email: email,
             displayName: displayName,  
             photoURL: photoURL,
           })
         );
       } else {
         //user is signed out
         dispatch(removeUser());   
       }
     }); 
 
 
     //Unsubscribe when component unmount
     return() => unsubscribe();
   },[]);

   const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/getstarted",
      element: <GetStarted />
    }
    
  ]);
  return (
    <div>
    <RouterProvider router={appRouter} />
  </div>
  );
}

export default App;
