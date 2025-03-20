import React, { createContext, useEffect, useState } from "react";


export const AllUsersContextAPI = createContext();
export const AlldietitiansContextAPI = createContext();
export const tokenauthcontext=createContext()


function ContextAPI({ children }) {
  const [allUsersResponse, setAllUsersResponse] = useState([]);
  const[alldietitiansresponse,setalldietitiansresponse]=useState([]);
  const[isauthorized,setisauthorized]=useState(false)


  useEffect(() => {


    if (sessionStorage.getItem("token")) {
      setisauthorized(true)
      
    }
    else{
      setisauthorized(false)
    }
    
  }, [isauthorized])
  


  return (

    <tokenauthcontext.Provider value={{isauthorized,setisauthorized}}>
    <AllUsersContextAPI.Provider value={{ allUsersResponse, setAllUsersResponse }}>

      <AlldietitiansContextAPI.Provider value={{alldietitiansresponse,setalldietitiansresponse}}>
      {children}
      </AlldietitiansContextAPI.Provider>
     
    </AllUsersContextAPI.Provider>
    </tokenauthcontext.Provider>
  );
}

export default ContextAPI;
