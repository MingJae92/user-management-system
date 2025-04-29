import getUsersFromDatabase from "../Services/userService.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsersFromDatabase();
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

const fetchUsersOnStart = async () => {
  try {
    const users = await getUsersFromDatabase();
    console.log("Fetched Users: ", users);
  } catch (error) {
    console.error("Error fetching users on server startup:", error);
  }
};

fetchUsersOnStart();

export default getAllUsers;