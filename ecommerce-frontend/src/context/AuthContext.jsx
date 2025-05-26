import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          return null;
        }

        return JSON.parse(storedUser);
      } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return null;
      }
    }

    return null;
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

  // New registerUser function - async example
  const registerUser = async (registerData) => {
    try {
      // Example API call - adjust URL and method as per your backend
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      // Assume backend returns a token on successful registration
      loginUser({ token: data.token });
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: error.message };
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, registerUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
