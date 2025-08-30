// AuthContext.tsx
import { createContext, useContext, useEffect, useState,  } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./FirebaseSdk";
import {doc, getDoc} from "firebase/firestore";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import { setDoc, serverTimestamp } from "firebase/firestore";

type AuthContextType = {
  user: User | null;
  role : string | null;
  loading : boolean ;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole ] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    try {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          await setDoc(userRef, {
            role: "buyer", // default role
            createdAt: serverTimestamp(),
          });
          console.log("User doc created:", currentUser.uid);
        }

        const data = (await getDoc(userRef)).data() as { role?: string };
        setRole(data?.role || "buyer");
      } else {
        setRole(null);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRole(null);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);
  return <AuthContext.Provider value={{ user,role, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};