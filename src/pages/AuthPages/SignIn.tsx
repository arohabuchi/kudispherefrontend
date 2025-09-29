import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

import axios from "axios"; 
import { useEffect, useState } from "react";

export default function SignIn() {
  const [user, setUser]= useState(null);
  const [error, setError]= useState("");

  // console.log(user);
  useEffect(()=>{
    const fetchUser= async ()=>{
      const tokens =localStorage.getItem("token");
        if (tokens) {
          try {
            const res  = await axios.get('/', {
              headers: {Authorization: `token ${tokens}`}
            })
            setUser(res.data)
          } catch (err) {
            setError("Failed to fetch user data");
            localStorage.removeItem("token")
          }
        }
      };
      fetchUser();
  }, [])
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout> 
        <SignInForm setUser={setUser} />
      </AuthLayout>
    </>
  );
}
