import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "../types/userTypes/userTypes.types";

const useReadUser = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:9000/api/users");
      setUserData(response.data.users);
      console.log(response.data.users)
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { userData, loading, error, refetch: fetchUsers };
};

export default useReadUser;
