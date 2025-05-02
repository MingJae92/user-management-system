import { ReactNode, Key } from "react";

export interface User {
  UserID: number;
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
  MFA_Mobile: number;
  ColourMode: string;
  HierarchyMaintenance: boolean;
}



export interface UserInput {
    O365Email: unknown;
    MFA_Mobile: unknown;
    ColourMode: unknown;
    FunctionalUser: boolean | undefined;
    BlockAccess: boolean | undefined;
    DisplayName: string;
    Email: string;
    Status: string;
    IsOSPAdmin: boolean;
    AdminUser: number;
  }
  