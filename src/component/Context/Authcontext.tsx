import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define types for user and context
export type UserDataTypes = {
  id: string;
  name: string;
  email: string;
};

export type AuthcontextDataTypes = {
  user: UserDataTypes | null;
  login: (userData: UserDataTypes) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDataTypes | null>(null);

  const login = (userData: UserDataTypes) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
    navigate("/dashboard"); // Navigate to dashboard after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login"); // Navigate to login page after logout
  };

  const value: AuthcontextDataTypes = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // Check if user exists (authenticated)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
