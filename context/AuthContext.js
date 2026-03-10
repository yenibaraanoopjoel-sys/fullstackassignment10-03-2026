import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore login state after refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { user, token } = response.data;

      setUser(user);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // CHECK AUTH
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};