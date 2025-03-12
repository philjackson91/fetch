import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./apiClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (name, email) => {
    try {
      await apiClient.post("/auth/login", { name, email });
      setUser({ name, email }); 
      navigate("/main"); 
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid login. Please check your name and email.");
    }
  };


  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
      setUser(null);
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
