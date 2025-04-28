import { useAuth } from "../Context/Authcontext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // If no user (not authenticated), redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children (protected content)
  return <>{children}</>;
};

export default ProtectedRoute;
