import PageMeta from "../components/common/PageMeta";
import AuthLayout from "../pages/AuthPages/AuthPageLayout";
import SignInForm from "../components/auth/SignInForm";
// ../../components/auth/SignInForm";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import axios from "axios"; 
import { useEffect, useState } from "react"; 

interface User {
  name: string;
  email: string;
}




export default function SignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the hook

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      console.log("User signed out successfully.");
      navigate('/signin'); // Redirect to the /signin page
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const tokens = localStorage.getItem("token");
      if (tokens) {
        try {
          const res = await axios.get('/', {
            headers: { Authorization: `token ${tokens}` }
          });
          setUser(res.data);
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        {user ? (
          <div>
            <h2>Welcome, {user?.firstName}!</h2>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <SignInForm setUser={setUser} />
        )}
      </AuthLayout>
    </>
  );
}