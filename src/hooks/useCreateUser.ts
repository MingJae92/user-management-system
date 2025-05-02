import { useState } from "react";
import axios from "axios";
import { UserInput } from "../types/userTypes/userTypes.types";

function useCreateUser() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const createUser = async (newUser: UserInput) => {
    setLoading(true);
    setError(null);
    console.log("Sending user data:", newUser); 
    try {
      const dataResponse = await axios.post(
        "http://localhost:9000/api/users/createuser",
        newUser
        
      );
      return dataResponse.data;
    
    } catch (err) {
      setError("Failed to create user.");
      console.error("Post error:", err);
      
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}

export default useCreateUser;