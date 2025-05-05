import { useState } from "react";
import { useAuth } from "../Context/Authcontext";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import {
  dashboardContainer,
  sectionTitle,
  loadingText,
  errorText,
  spinnerContainer,
} from "../../styles/dashBoardStyles/dashBoardStyles.styles";
import useReadUser from "../../hooks/useReadUser";
import {
  FilterType,
  FormDataProps,
  User,
} from "../../types/userTypes/userTypes.types";
import UserFilters from "../UserFilter/UserFilter";
import UserCardList from "../UserCardList/UserCardList";
import CreateUserDialog from "../CreateUserDialog/CreateUserDialog";
import DeleteUserDialog from "../DeleteUserDialog/DeleteUserDialog";
import UpdateUserDialog from "../UpdateUserDialog/UpdateUserDialog";
import ConfirmUpdateDialog from "../ConfirmUpdateDialog/ConfirmUpdateDialog";
import useUpdateUser from "../../hooks/useUpdateUser";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { loading, error, userData, refetch } = useReadUser();

  const [filterType, setFilterType] = useState<FilterType>("all");
  // const [open, setOpen] = useState(false);
  const [createUserOpen, setCreateUserOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
  const [confirmUpdateDialogOpen, setConfirmUpdateDialogOpen] =
    useState<boolean>(false); // New dialog state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormDataProps | null>(null);

  function applyFilter(users: User[], criteria: string): User[] {
    const filterMap: Record<string, () => User[]> = {
      active: () => users.filter((u) => u.Status === "Active"),
      admin: () => users.filter((u) => u.IsOSPAdmin),
      all: () => users,
    };
    return filterMap[criteria]?.() || users;
  }

  const filteredUsers = userData ? applyFilter(userData, filterType) : [];

  const handleOpenCreateDialog = () => {
    setCreateUserOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleCreateSuccess = async () => {
    await refetch();
    setCreateUserOpen(false);
  };

  const confirmDelete = (userId: number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = async () => {
    await refetch();
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleOpenUpdateDialog = (user: User) => {
    setSelectedUser(user);
    setUpdateDialogOpen(true);
  };

  const handleUpdateConfirmation = (latestFormData: FormDataProps) => {
    setConfirmUpdateDialogOpen(true);
    setFormData(latestFormData);
  };
  
  const { updateUser } = useUpdateUser();
  const handleUpdateSuccess = async () => {
    if (selectedUser) {
      await updateUser({ ...selectedUser, ...formData });
      await refetch();
      setUpdateDialogOpen(false);
      setConfirmUpdateDialogOpen(false);
      setSelectedUser(null);
    }
  };

  if (!user) {
    return (
      <Typography sx={errorText}>
        Please log in to access the dashboard.
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box sx={spinnerContainer}>
        <CircularProgress color="primary" />
        <Typography sx={loadingText}>Loading user data...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography sx={errorText}>Error fetching user data.</Typography>;
  }

  return (
    <Box sx={dashboardContainer}>
      <Typography variant="h4" gutterBottom>
        Welcome to your Dashboard, {user.name}!
      </Typography>
      <Typography>Email: {user.email}</Typography>
      <Button variant="outlined" onClick={logout} sx={{ mt: 2 }}>
        Log out
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateDialog}
        sx={{ mt: 3 }}
      >
        Create New User
      </Button>

      <UserFilters filterType={filterType} setFilterType={setFilterType} />

      <Typography variant="h5" sx={sectionTitle}>
        {filterType === "all" ? "All Users:" : `Filtered Users: ${filterType}`}
      </Typography>

      <UserCardList
        users={filteredUsers}
        onUpdateClick={handleOpenUpdateDialog}
        onDeleteClick={confirmDelete}
      />

      <CreateUserDialog
        open={createUserOpen}
        onClose={handleCloseCreateDialog}
        onCreateSuccess={handleCreateSuccess}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        userId={userToDelete}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <UpdateUserDialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
        user={selectedUser}
        onUpdateConfirm={handleUpdateConfirmation}
      />

      <ConfirmUpdateDialog
        open={confirmUpdateDialogOpen}
        onClose={() => setConfirmUpdateDialogOpen(false)}
        onConfirm={handleUpdateSuccess}
      />
    </Box>
  );
};

export default Dashboard;
