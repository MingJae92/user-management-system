import { Box, Button } from "@mui/material";
import { UserFilter } from "../../types/userTypes/userTypes.types";  // Adjust the path based on your file structure

const Userfilter = ({ filterType, setFilterType }: UserFilter) => {
  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Button
        variant="outlined"
        onClick={() => setFilterType("active")}
        color={filterType === "active" ? "primary" : "inherit"}  // Changed "default" to "inherit"
      >
        Show Active Users
      </Button>
      <Button
        variant="outlined"
        onClick={() => setFilterType("admin")}
        sx={{ ml: 2 }}
        color={filterType === "admin" ? "primary" : "inherit"}  // Changed "default" to "inherit"
      >
        Show Admins
      </Button>
      <Button
        variant="outlined"
        onClick={() => setFilterType("all")}
        sx={{ ml: 2 }}
        color={filterType === "all" ? "primary" : "inherit"}  // Changed "default" to "inherit"
      >
        Show All Users
      </Button>
    </Box>
  );
};

export default Userfilter;
