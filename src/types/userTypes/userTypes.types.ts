import { ReactNode, Key } from "react";

export interface User {
  UserID: Key | null | undefined;
  //   displayName: unknown;
  //   email: unknown;
  //   password: unknown;
  //   isAdmin: boolean;
  //   name: ReactNode;
  //   id: Key | null | undefined;
  //   UserID: number;
  DisplayName: string;
  Email: string;
  IsOSPAdmin: boolean;
  Status: string;
  FunctionalUser: number;
  AdminUser: number;
  BlockAccess: number;
  O365Email: string;
  MFA_Mobile: string;
  ColourMode: string;
  HierarchyMaintenance: boolean;
}

export interface UserInput {
    DisplayName: string;
    Email: string;
    Status: string;
    IsOSPAdmin: boolean;
    AdminUser: number;
  }
  