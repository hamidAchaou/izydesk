import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❗ Redirect to /forbidden if user lacks roles
  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => user.roles?.includes(role))
  ) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default ProtectedRoute;
