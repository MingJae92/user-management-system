import { Box } from "@mui/material";
import UserCard from "../Usercard/Usercard";
import { userCardContainer } from "../../styles/dashBoardStyles/dashBoardStyles.styles";
import { User, UserCardListProps } from "../../types/userTypes/userTypes.types";

const UserCardList = ({ users, onUpdateClick, onDeleteClick }:UserCardListProps) => {
  return (
    <Box sx={userCardContainer}>
      {users.map((user:User) => (
        <UserCard
          key={user.UserID}
          user={user}
          onUpdateClick={onUpdateClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </Box>
  );
};

export default UserCardList;