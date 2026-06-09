"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { type User } from "firebase/auth";
import { onAuthChange } from "@/lib/firebase/auth";

interface AuthState {
  user: User | null;
  /** true until the FIRST onAuthStateChanged callback fires */
  loading: boolean;
}

const AuthContext = createContext<AuthState>({ user: null, loading: true });

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Start as true — stays true until Firebase resolves the persisted session
  const [loading, setLoading] = useState(true);
  const resolvedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      // Only set loading false once — prevents flicker on token refresh
      if (!resolvedRef.current) {
        resolvedRef.current = true;
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
