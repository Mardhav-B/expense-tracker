import { createContext, useContext, useState } from "react";
import type { User } from "@/types";
import { getCurrentUser, setCurrentUser } from "@/utils/storage";

interface AuthType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const login = (u: User) => {
    setUser(u);
    setCurrentUser(u);
  };

  const logout = () => {
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Auth missing");
  return ctx;
};
