import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Account/Authcontext";

const ProtectedRoute = () => {
    const { loading } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");

  if (loading) return <div>Loading...</div>;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;