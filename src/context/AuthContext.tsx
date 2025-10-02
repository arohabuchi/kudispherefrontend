import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



// 👤 User type (based on your mongoose model)
export interface ProfileAddress {
  country?: string;
  state?: string;
  homeAddress?: string;
  phoneNumber?: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
  amount: number;
  payout: number;
  profileAddress?: ProfileAddress;
  createdAt?: string;
  updatedAt?: string;
}

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
  user:  User | null;
  token: string | null;
  isLoading: boolean;
  error: string;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
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
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };