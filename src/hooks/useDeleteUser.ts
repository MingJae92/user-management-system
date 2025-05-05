import axios from "axios";
import { useState } from "react";

function useDeleteUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const deleteUser = async (userID: number): Promise<boolean> => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:9000/api/users/deleteuser/${userID}`);
      return true;
    } catch (error:any) {
      setError(error.response?.data?.message || error.message || "Delete failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
}

export default useDeleteUser;
