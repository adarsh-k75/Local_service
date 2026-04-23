import { createContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.get("Navbar/", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setUser(res.data);
    })
    .catch(() => {
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