import { ReactNode, Key } from "react";

export interface User {
    name: ReactNode;
    id: Key | null | undefined;
    UserID: number;
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
  
//    export interface UsersResponse {
//     name: ReactNode;
//     email: ReactNode;
//     id: Key | null | undefined;
//     users: User[];
//   }
  