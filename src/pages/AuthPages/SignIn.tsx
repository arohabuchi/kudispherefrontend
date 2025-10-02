import { useEffect, useState } from "react";
import axios from "axios";

import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

// ✅ Strongly typed User interface (matches backend model)
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  amount: number;
  payout: number;
  createdAt: string;
  updatedAt: string;
}




export default function SignIn() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get<User>("/", {
            headers: { Authorization: `token ${token}` },
          });
          setUser(res.data);
        } catch (err: unknown) {
          console.error("Error fetching user:", err);
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
        <SignInForm  />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* ✅ Example usage of user */}
        {user && (
          <p className="text-green-600 text-sm mt-2">
            Welcome back, {user.firstName} {user.lastName}!
          </p>
        )}
      </AuthLayout>
    </>
  );
}









// import PageMeta from "../../components/common/PageMeta";
// import AuthLayout from "./AuthPageLayout";
// import SignInForm from "../../components/auth/SignInForm";

// import axios from "axios"; 
// import { useEffect, useState } from "react";

// export default function SignIn() {
//   const [user, setUser]= useState(null);
//   const [error, setError]= useState("");

//   // console.log(user);
//   useEffect(()=>{
//     const fetchUser= async ()=>{
//       const tokens =localStorage.getItem("token");
//         if (tokens) {
//           try {
//             const res  = await axios.get('/', {
//               headers: {Authorization: `token ${tokens}`}
//             })
//             setUser(res.data)
//           } catch (err) {
//             setError("Failed to fetch user data");
//             localStorage.removeItem("token")
//           }
//         }
//       };
//       fetchUser();
//   }, [])
//   return (
//     <>
//       <PageMeta
//         title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//         description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <AuthLayout> 
//         <SignInForm setUser={setUser} />
//       </AuthLayout>
//     </>
//   );
// }
