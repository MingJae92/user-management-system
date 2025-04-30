import React, { useState } from "react";
import { User } from "../types/userTypes/userTypes.types";
import axios from "axios";

function useUpdateUser() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const updateUser = async (UserID: number, updatedUser: User) => {
    setLoading(true);
    try {
      const dataResponse = await axios.put(
        `http://localhost:9000/api/users/${updatedUser.UserID}`,
        updatedUser
      );
      return dataResponse;
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return { updateUser, loading, error };
}

export default useUpdateUser;
