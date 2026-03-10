import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {

  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>

      <p>User Email: {user?.email}</p>

    </div>
  );
};

export default Dashboard;