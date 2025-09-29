import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return token ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
