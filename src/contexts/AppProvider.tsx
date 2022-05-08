import React, {createContext, useContext, useState} from 'react'
import {useNavigate} from "react-router-dom"
import useUserLoggedin from "./useUserLoggedin"


// App Context Type 
type AppContextType = {
    userLoggedin:{
      user:  string ;
      setUser:React.Dispatch<React.SetStateAction<string>>
    },
   
}



// Create App Context
const AppContext = createContext<AppContextType>(null!);



//App Context Provider
export default function AppProvider({children}:{children:React.ReactNode}) {


  const userLoggedin = useUserLoggedin();




  
  const appContextValue = {
    userLoggedin
  }



  
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
  return useContext(AppContext);
}










