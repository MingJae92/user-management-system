import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/Authcontext"; // Access Auth context
import { ProtectRoutesProps } from "../../types/authProviderTypes/authprovider.types";

function Protectedroutes({ children }: ProtectRoutesProps) {
  const { user } = useAuth(); // Access current user from Auth context

  if (!user) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render children (the protected route, e.g., /dashboard)
  return children || <Outlet />;
}

export default Protectedroutes;
