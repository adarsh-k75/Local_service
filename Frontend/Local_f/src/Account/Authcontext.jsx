import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     api.get("Navbar/", {
    withCredentials: true,   // ✅ use cookies
  })
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      console.log("AUTH ERROR:", err.response?.status);
      setUser(null);
    })
    .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};