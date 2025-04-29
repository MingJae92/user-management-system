import { useEffect, useState } from "react";
import { useAuth } from "../Context/Authcontext";
import { User } from "../../types/userTypes/userTypes.types";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { user, logout } = useAuth();

  useEffect(() => {
    const userDataFetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:9000/api/users");
        setUserData(response.data.users); // or response.data depending on your API
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    userDataFetch();
  }, []);

  // Early return for unauthenticated user
  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  // Early return for loading state
  if (loading) {
    return <div>Loading user data...</div>;
  }

  // Early return for error state
  if (error) {
    return <div>Error fetching user data.</div>;
  }

  // Final render if all is fine
  return (
    <div>
      <h1>Welcome to your Dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Log out</button>

      <h2>All Users:</h2>
      {userData.map((item) => (
        <div
          key={item.UserID}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "1rem",
            padding: "0.5rem 0",
          }}
        >
          <p><strong>Name:</strong> {item.DisplayName}</p>
          <p><strong>Email:</strong> {item.Email}</p>
          <p><strong>Status:</strong> {item.Status}</p>
          <p><strong>Is Admin:</strong> {item.IsOSPAdmin ? "Yes" : "No"}</p>
          <p><strong>AdminUser Flag:</strong> {item.AdminUser}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
