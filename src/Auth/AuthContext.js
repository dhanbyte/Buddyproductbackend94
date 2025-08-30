import { jsx as _jsx } from "react/jsx-runtime";
// AuthContext.tsx
import { createContext, useContext, useEffect, useState, } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./FirebaseSdk";
import { doc, getDoc } from "firebase/firestore";
import { setDoc, serverTimestamp } from "firebase/firestore";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
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
                    const data = (await getDoc(userRef)).data();
                    setRole(data?.role || "buyer");
                }
                else {
                    setRole(null);
                }
            }
            catch (error) {
                console.error("Error fetching user role:", error);
                setRole(null);
            }
            finally {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);
    return _jsx(AuthContext.Provider, { value: { user, role, loading }, children: children });
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
