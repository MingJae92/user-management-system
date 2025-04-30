import React, {  useState } from "react";
import { User } from "../types/userTypes/userTypes.types";
import axios from "axios";
import { UserInput } from "../types/userTypes/userTypes.types";

function useCreateUser() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const createUser = async (newUser: UserInput) => {
    try {
      const dataResponse = await axios.post(
        "http://localhost:9000/api/users/createuser",
        newUser
      );
      return dataResponse.data;
    } catch (error) {
      setError(null);
      console.log("Post error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return { createUser, loading, error };
}

export default useCreateUser;
