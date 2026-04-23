import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("access_token");

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    api.get('UserProfile/') 
      .then((res) => {
        setRole(res.data.role);
      })
      .catch(() => {
        localStorage.removeItem("access_token");
      })
      .finally(() => {
        setLoading(false);
      });
    
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;