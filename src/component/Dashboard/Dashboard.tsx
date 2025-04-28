import { useAuth } from "../Context/Authcontext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) {
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
