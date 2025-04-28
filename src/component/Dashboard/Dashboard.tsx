import { useAuth } from "../Context/Authcontext"; // Import the useAuth hook

const Dashboard = () => {
  const { user, logout } = useAuth(); // Get user data and logout function from context

  if (!user) {
    // Optionally handle the case where there's no user logged in
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Dashboard;
