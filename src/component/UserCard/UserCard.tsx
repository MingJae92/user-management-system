import {
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { userCard } from "../../styles/dashBoardStyles/dashBoardStyles.styles";
// import { User } from "../../types/userTypes/userTypes.types";
import { UserCardProps } from "../../types/userTypes/userTypes.types";

const Usercard = ({ user, onUpdateClick, onDeleteClick }: UserCardProps) => {
  return (
    <Card sx={userCard}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar sx={{ mr: 2 }}>{user.DisplayName[0]}</Avatar>
          <Typography variant="h6">{user.DisplayName}</Typography>
        </Box>
        <Typography variant="body2">
          <strong>Email:</strong> {user.Email}
        </Typography>
        <Typography variant="body2">
          <strong>Status:</strong> {user.Status}
        </Typography>
        <Typography variant="body2">
          <strong>Is Admin:</strong> {user.IsOSPAdmin ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2">
          <strong>Functional User:</strong> {user.FunctionalUser ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2">
          <strong>Block Access:</strong> {user.BlockAccess ? "Yes" : "No"}
        </Typography>
        <Typography variant="body2">
          <strong>O365 Email:</strong> {user.O365Email}
        </Typography>
        <Typography variant="body2">
          <strong>MFA Mobile:</strong> {user.MFA_Mobile}
        </Typography>
        <Typography variant="body2">
          <strong>Colour Mode:</strong> {user.ColourMode}
        </Typography>
        <Typography variant="body2">
          <strong>AdminUser Flag:</strong> {user.AdminUser ? "Yes" : "No"}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => onUpdateClick(user)}
          sx={{ mt: 2 }}
        >
          Update
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onDeleteClick(user.UserID)}
          sx={{ mt: 2, ml: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Usercard;
