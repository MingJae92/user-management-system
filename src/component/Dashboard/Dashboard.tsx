import { useState } from "react";
import { useAuth } from "../Context/Authcontext";
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  dashboardContainer,
  sectionTitle,
  loadingText,
  errorText,
  spinnerContainer,
  userCardContainer,
  userCard,
} from "../../styles/dashBoardStyles/dashBoardStyles.styles";
import useCreateUser from "../../hooks/useCreateUser";
import useReadUser from "../../hooks/useReadUser";
import useDeleteUser from "../../hooks/useDeleteUser";
import useUpdateUser from "../../hooks/useUpdateUser";
import { UserInput, User } from "../../types/userTypes/userTypes.types";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { loading, error, userData, refetch } = useReadUser();
  const { createUser } = useCreateUser();
  const { deleteUser } = useDeleteUser();
  const { updateUser } = useUpdateUser();

  const [filterType, setFilterType] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [confirmUpdateDialogOpen, setConfirmUpdateDialogOpen] = useState(false); // New dialog state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<UserInput>({
    DisplayName: "",
    Email: "",
    Status: "Active",
    IsOSPAdmin: false,
    FunctionalUser: false,
    BlockAccess: false,
    O365Email: "",
    MFA_Mobile: "",
    ColourMode: "Light",
    AdminUser: 0,
  });

  const [errors, setErrors] = useState<any>({});

  const filteredUsers = applyFilter(userData, filterType);

  function applyFilter(users: User[], criteria: string): User[] {
    const filterMap: Record<string, () => User[]> = {
      active: () => users.filter((u) => u.Status === "Active"),
      admin: () => users.filter((u) => u.IsOSPAdmin),
      all: () => users,
    };
    return filterMap[criteria]?.() || users;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked })); // Now keeping it boolean
  };

  const validateForm = () => {
    let formErrors: any = {};
    if (!formData.DisplayName)
      formErrors.DisplayName = "Display Name is required.";
    if (!formData.Email || !/\S+@\S+\.\S+/.test(formData.Email))
      formErrors.Email = "A valid Email is required.";
    if (!formData.O365Email || !/\S+@\S+\.\S+/.test(formData.O365Email))
      formErrors.O365Email = "A valid O365 Email is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    await createUser(formData);
    await refetch();
    setOpen(false);
    setFormData({
      DisplayName: "",
      Email: "",
      Status: "Active",
      IsOSPAdmin: false,
      FunctionalUser: false,
      BlockAccess: false,
      O365Email: "",
      MFA_Mobile: "",
      ColourMode: "Light",
      AdminUser: 0,
    });
  };

  const confirmDelete = (userId: number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (userToDelete !== null) {
      await deleteUser(userToDelete);
      await refetch();
    }
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleUpdateUser = async () => {
    if (selectedUser && !validateForm()) return;

    if (selectedUser) {
      setConfirmUpdateDialogOpen(true); // Show confirmation dialog first
    }
  };

  const handleConfirmUpdate = async () => {
    if (selectedUser) {
      await updateUser({ ...selectedUser, ...formData });
      await refetch();
      setUpdateDialogOpen(false);
      setConfirmUpdateDialogOpen(false); // Close the confirmation dialog
      setSelectedUser(null);
      setFormData({
        DisplayName: "",
        Email: "",
        Status: "Active",
        IsOSPAdmin: false,
        FunctionalUser: false,
        BlockAccess: false,
        O365Email: "",
        MFA_Mobile: "",
        ColourMode: "Light",
        AdminUser: 0,
      });
    }
  };

  const handleOpenUpdateDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      DisplayName: user.DisplayName,
      Email: user.Email,
      Status: user.Status,
      IsOSPAdmin: user.IsOSPAdmin,
      FunctionalUser: user.FunctionalUser,
      BlockAccess: user.BlockAccess,
      O365Email: user.O365Email,
      MFA_Mobile: user.MFA_Mobile,
      ColourMode: user.ColourMode,
      AdminUser: user.AdminUser,
    });
    setUpdateDialogOpen(true);
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
        onClick={() => setOpen(true)}
        sx={{ mt: 3 }}
      >
        Create New User
      </Button>

      {/* Filter Buttons */}
      <Box sx={{ mt: 3, mb: 2 }}>
        <Button variant="outlined" onClick={() => setFilterType("active")}>
          Show Active Users
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilterType("admin")}
          sx={{ ml: 2 }}
        >
          Show Admins
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilterType("all")}
          sx={{ ml: 2 }}
        >
          Show All Users
        </Button>
      </Box>

      <Typography variant="h5" sx={sectionTitle}>
        {filterType === "all" ? "All Users:" : `Filtered Users: ${filterType}`}
      </Typography>

      <Box sx={userCardContainer}>
        {filteredUsers.map((item) => (
          <Card key={item.UserID} sx={userCard}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ mr: 2 }}>{item.DisplayName[0]}</Avatar>
                <Typography variant="h6">{item.DisplayName}</Typography>
              </Box>
              <Typography variant="body2">
                <strong>Email:</strong> {item.Email}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {item.Status}
              </Typography>
              <Typography variant="body2">
                <strong>Is Admin:</strong> {item.IsOSPAdmin ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Functional User:</strong>{" "}
                {item.FunctionalUser ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>Block Access:</strong> {item.BlockAccess ? "Yes" : "No"}
              </Typography>
              <Typography variant="body2">
                <strong>O365 Email:</strong> {item.O365Email}
              </Typography>
              <Typography variant="body2">
                <strong>MFA Mobile:</strong> {item.MFA_Mobile}
              </Typography>
              <Typography variant="body2">
                <strong>Colour Mode:</strong> {item.ColourMode}
              </Typography>
              <Typography variant="body2">
                <strong>AdminUser Flag:</strong> {item.AdminUser}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenUpdateDialog(item)}
                sx={{ mt: 2 }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => confirmDelete(item.UserID)}
                sx={{ mt: 2, ml: 2 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Confirmation Dialog */}
      <Dialog
        open={confirmUpdateDialogOpen}
        onClose={() => setConfirmUpdateDialogOpen(false)}
      >
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to update the user's details?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmUpdateDialogOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="secondary">
            Confirm Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update User Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={() => setUpdateDialogOpen(false)}
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            label="Display Name"
            name="DisplayName"
            value={formData.DisplayName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.DisplayName}
            helperText={errors.DisplayName}
          />
          <TextField
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.Email}
            helperText={errors.Email}
          />
          <TextField
            label="O365 Email"
            name="O365Email"
            value={formData.O365Email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.O365Email}
            helperText={errors.O365Email}
          />
          <TextField
            label="Colour Mode (Light/Dark)"
            name="ColourMode"
            value={formData.ColourMode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.ColourMode}
            helperText={errors.ColourMode || "Enter 'Light' or 'Dark'"}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.IsOSPAdmin}
                onChange={handleSwitchChange}
                name="IsOSPAdmin"
              />
            }
            label="Is OSP Admin"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.FunctionalUser}
                onChange={handleSwitchChange}
                name="FunctionalUser"
              />
            }
            label="Functional User"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.BlockAccess}
                onChange={handleSwitchChange}
                name="BlockAccess"
              />
            }
            label="Block Access"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="secondary">
            Update User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <TextField
            label="Display Name"
            name="DisplayName"
            value={formData.DisplayName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.DisplayName}
            helperText={errors.DisplayName}
          />
          <TextField
            label="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.Email}
            helperText={errors.Email}
          />
          <TextField
            label="O365 Email"
            name="O365Email"
            value={formData.O365Email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.O365Email}
            helperText={errors.O365Email}
          />

          <TextField
            label="Colour Mode (Light/Dark)"
            name="ColourMode"
            value={formData.ColourMode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.ColourMode}
            helperText={errors.ColourMode}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.IsOSPAdmin}
                onChange={handleSwitchChange}
                name="IsOSPAdmin"
              />
            }
            label="Is OSP Admin"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.FunctionalUser}
                onChange={handleSwitchChange}
                name="FunctionalUser"
              />
            }
            label="Functional User"
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.BlockAccess}
                onChange={handleSwitchChange}
                name="BlockAccess"
              />
            }
            label="Block Access"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="secondary">
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
