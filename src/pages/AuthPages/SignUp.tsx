import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

import axios from "axios";
import { useEffect, useState } from "react";

export default function SignUp() {
  const [user, setUser]= useState(null);
  const [error, setError]= useState("");

  console.log(user);
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
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm setUser={setUser}/>
      </AuthLayout>
    </>
  );
}
