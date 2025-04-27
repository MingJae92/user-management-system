import { ReactNode } from "react";

export interface AuthProviderDataTypes {
  children: ReactNode;
}

export interface UserDataTypes {
  id: string;
  name: string;
  email: string;
}

export interface AuthcontextDataTypes {
  user: UserDataTypes | null;
  login: (userData: UserDataTypes) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ProtectRoutesProps {
  children? :ReactNode
}
