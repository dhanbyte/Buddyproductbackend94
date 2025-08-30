import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { JSX } from "react";

type ProtectedRouteProps = {
  allowedRoles: string[]; // Accept an array of roles
  children: JSX.Element;
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  const userRole = user?.publicMetadata?.role as string;

  // Check if the user's role is included in the allowed roles
  if (!allowedRoles.includes(userRole)) {
    // Redirect if the role is not allowed
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;