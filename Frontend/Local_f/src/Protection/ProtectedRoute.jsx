import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Account/Authcontext";

const ProtectedRoute = () => {
   const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");

  if (loading) return <div>Loading...</div>;

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;