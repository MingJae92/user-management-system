export interface User {
  UserID: number;
  DisplayName: string;
  Email: string;
  IsOSPAdmin: boolean;
  Status: string;
  FunctionalUser: boolean;
  AdminUser: number;
  BlockAccess: boolean;
  O365Email: string;
  MFA_Mobile: string; // <- changed to string
  ColourMode: string;
  HierarchyMaintenance: boolean;
}

export interface UserInput {
  O365Email: string;
  MFA_Mobile: string; // <- make consistent
  ColourMode: string;
  FunctionalUser: boolean;
  BlockAccess: boolean;
  DisplayName: string;
  Email: string;
  Status: string;
  IsOSPAdmin: boolean;
  AdminUser: number;
}
