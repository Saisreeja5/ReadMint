import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>; // or a spinner
  }

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
