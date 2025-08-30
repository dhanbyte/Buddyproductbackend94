// src/Auth/RoleRedirect.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleRedirect = () => {
  const { role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role) {
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "seller") navigate("/seller/dashboard");
      else navigate("/buyer/home");
    }
  }, [loading, role]);

  return null; // No UI, just logic
};

export default RoleRedirect;