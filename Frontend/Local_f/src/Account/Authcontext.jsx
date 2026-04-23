import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
      axios.get("Navbar/",{
      withCredentials: true
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => console.log(err));
  },[])


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};