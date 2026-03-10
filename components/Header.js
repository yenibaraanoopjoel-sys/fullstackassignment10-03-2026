import { useAuth } from "../hooks/useAuth";

const Header = () => {

  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header>

      <h1>My App</h1>

      {isAuthenticated ? (
        <>
          <span>Welcome {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Please Login</span>
      )}

    </header>
  );
};

export default Header;