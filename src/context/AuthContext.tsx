import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔑 Add axios interceptor so every request has x-auth-token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;  // 👈 use x-auth-token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface AuthContextType {
  user: any;
  token: string | null;
  isLoading: boolean;
  error: string;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/profile", {
          headers: { "x-auth-token": token },  // 👈 use x-auth-token
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          setError("Session expired. Please login again.");
          signOut();
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const signIn = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/dashboard");
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, error, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};



















// // src/contexts/AuthContext.tsx
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           // This endpoint should return the user's data based on the token
//           const res = await axios.get('http://localhost:8000/', {
//             headers: { Authorization: `Token ${token}` }
//           });
//           // Assuming your backend returns the user object directly
//           setUser(res.data);
//         } catch (err) {
//           console.error("Failed to fetch user data:", err);
//           localStorage.removeItem("token");
//           setUser(null);
//         }
//       }
//       setIsLoading(false);
//     };
//     fetchUser();
//   }, []);

//   const signIn = async (formData) => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/signin", formData);
//       // The fix: store the token and set the user from the response data.
//       localStorage.setItem("token", res.data.token);
//       // Assuming your signin API returns `{ token: '...', user: { ... } }`
//       setUser(res.data.user); 
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Login Failed";
//       throw new Error(errorMsg);
//     }
//   };

//   const signOut = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   const value = {
//     user,
//     isLoading,
//     signIn,
//     signOut,
//     setUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };