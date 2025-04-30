import axios from "axios";
import React, { useState } from "react";

function useDeleteUser() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const deleteUser = async (userID: number) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:9000/api/users/${userID}`);
    } catch (error) {
      setError(null);
    } finally {
      setLoading(false);
    }
  };
  return { deleteUser, loading, error };
}

export default useDeleteUser;
