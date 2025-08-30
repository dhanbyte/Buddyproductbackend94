import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { UserAPI } from "../lib/api";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          await UserAPI.getProfile(token);
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, getToken]);

  return <>{children}</>;
};

export default AuthWrapper;
