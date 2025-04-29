import { useEffect, useState } from "react";
import { useAuth } from "../Context/Authcontext";
import { User } from "../../types/userTypes/userTypes.types";
import axios from "axios";

import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Avatar,
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

const Dashboard = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const userDataFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:9000/api/users");
        setUserData(response.data.users);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    userDataFetch();
  }, []);

  if (!user) {
    return <Typography sx={errorText}>Please log in to access the dashboard.</Typography>;
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

      <Typography variant="h5" sx={sectionTitle}>
        All Users:
      </Typography>

      <Box sx={userCardContainer}>
        {userData.map((item) => (
          <Card key={item.UserID} sx={userCard}>
            <CardContent>
              {/* Avatar section */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ mr: 2 }}>{item.DisplayName[0]}</Avatar>
                <Typography variant="h6">{item.DisplayName}</Typography>
              </Box>

              <Typography variant="body2"><strong>Email:</strong> {item.Email}</Typography>
              <Typography variant="body2"><strong>Status:</strong> {item.Status}</Typography>
              <Typography variant="body2"><strong>Is Admin:</strong> {item.IsOSPAdmin ? "Yes" : "No"}</Typography>
              <Typography variant="body2"><strong>AdminUser Flag:</strong> {item.AdminUser}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
