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
  MFA_Mobile: string;
  ColourMode: string;
  FunctionalUser: boolean;
  BlockAccess: boolean;
  DisplayName: string;
  Email: string;
  Status: string;
  IsOSPAdmin: boolean;
  AdminUser: number;
}

export interface UserCardProps {
  user: User;
  onUpdateClick: (user: User) => void;
  onDeleteClick: (userId: number) => void;
}

export interface UserDeleteProps {
  userId: number | null;
  onDeleteSuccess: () => void;
  open: boolean;
  onClose: () => void;
}

export interface ConfirmUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export type FilterType = "active" | "admin" | "all";

export interface UserFilter {
  filterType: FilterType;
  setFilterType: (type: FilterType) => void;
}

export interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateSuccess: () => void;
}

export interface ValidateUserFormProps {
  DisplayName: string;
  Email: string;
  O365Email: string;
  ColourMode: string;
}

export interface FormDataProps {
  DisplayName: string;
  Email: string;
  Status: string;
  IsOSPAdmin: boolean;
  FunctionalUser: boolean;
  BlockAccess: boolean;
  O365Email: string;
  MFA_Mobile: string;
  ColourMode: string;
  AdminUser: number;
}

export interface UpdateUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: FormDataProps | null;
  onUpdateConfirm: (updatedUser: FormDataProps) => void;

}

export interface UserCardListProps {
  users:User[]
  onUpdateClick:(user:User)=>void
  onDeleteClick:(userId:number)=>void
}

