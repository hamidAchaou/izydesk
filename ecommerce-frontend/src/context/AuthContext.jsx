import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userData) => {
    try {
      const decoded = jwtDecode(userData.token);

      const fullUser = {
        token: userData.token,
        username: decoded.username || "",
        firstName: decoded.firstName || "",
        roles: decoded.roles || [],
      };

      setUser(fullUser);
      localStorage.setItem("user", JSON.stringify(fullUser));
      localStorage.setItem("token", userData.token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
