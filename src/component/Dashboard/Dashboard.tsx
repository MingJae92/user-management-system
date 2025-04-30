import { useState, useEffect } from "react";
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
import { UserInput, User } from "../../types/userTypes/userTypes.types";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { loading, error, userData, refetch } = useReadUser();
  const { createUser } = useCreateUser();

  const [filterType, setFilterType] = useState<string>("all");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<UserInput>({
    DisplayName: "",
    Email: "",
    Status: "Active",
    IsOSPAdmin: false,
    AdminUser: 0,
  });

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleCreateUser = async () => {
    await createUser(formData);
    await refetch();
    setOpen(false);
    setFormData({
      DisplayName: "",
      Email: "",
      Status: "Active",
      IsOSPAdmin: false,
      AdminUser: 0,
    });
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
        <Button variant="outlined" onClick={() => setFilterType("admin")} sx={{ ml: 2 }}>
          Show Admins
        </Button>
        <Button variant="outlined" onClick={() => setFilterType("all")} sx={{ ml: 2 }}>
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
                <strong>AdminUser Flag:</strong> {item.AdminUser}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="DisplayName"
            label="Display Name"
            fullWidth
            value={formData.DisplayName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Email"
            label="Email"
            fullWidth
            value={formData.Email}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.IsOSPAdmin}
                onChange={handleSwitchChange}
                name="IsOSPAdmin"
              />
            }
            label="Is Admin"
          />
          <TextField
            margin="dense"
            name="AdminUser"
            label="Admin User Flag"
            fullWidth
            type="number"
            value={formData.AdminUser}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
