import React, { use, useState } from "react";
import { User } from "../types/userTypes/userTypes.types";
import axios from "axios";

function useCreateUser() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const createUser = async (newUser: User) => {
    try {
      const dataResponse = await axios.post(
        "http://localhost:9000/api/users",
        newUser
      );
      return dataResponse.data;
    } catch (error) {
      setError(true);
      console.log("Post error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return { createUser, loading, error };
}

export default useCreateUser;
