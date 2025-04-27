import { createContext, useContext, useState } from "react";
import {
  AuthProviderDataTypes,
  UserDataTypes,
  AuthcontextDataTypes,
} from "../../types/authProviderTypes/authprovider.types";

const AuthContext = createContext<AuthcontextDataTypes>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderDataTypes) => {
  const [user, setUser] = useState<UserDataTypes | null>(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? (JSON.parse(savedUser) as UserDataTypes) : null;
    } catch (error) {
      console.error("Error reading user from localStorage", error);
      return null;
    }
  });

  const login = (userData: UserDataTypes) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Context value to provide
  const value: AuthcontextDataTypes = {
    user,
    login,
    logout,
    isAuthenticated: !!user, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
