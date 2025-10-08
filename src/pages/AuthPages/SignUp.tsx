import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";
import axios from "axios";
import { useEffect, useState } from "react";

// ✅ NEW: Strongly typed User interface
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
  amount: number;
  payout: number;
  createdAt: string;
  updatedAt: string;
}

export default function SignUp() {
  // ✅ NEW: Add generic <User | null> to state
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  console.log(user);

  useEffect(() => {
    const fetchUser = async () => {
      const tokens = localStorage.getItem("token");
      if (tokens) {
        try {
          const res = await axios.get<User>("/", {
            headers: { Authorization: `token ${tokens}` },
          });
          setUser(res.data);
        } catch (err) {
          setError("Failed to fetch user data");
          localStorage.removeItem("token");
          console.log(error);
        console.error("Fetch user error:", err); 
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <PageMeta
        title="KUDISPHERE! Send & Receive crypto funds"
        description="Welcome to kudisphere! go borderless in your financial transaction"
      />
      <AuthLayout>
        {/* ✅ NEW: setUser now matches expected type */}
        <SignUpForm setUser={setUser} />
      </AuthLayout>
    </>
  );
}

















// import PageMeta from "../../components/common/PageMeta";
// import AuthLayout from "./AuthPageLayout";
// import SignUpForm from "../../components/auth/SignUpForm";

// import axios from "axios";
// import { useEffect, useState } from "react";



// export default function SignUp() {
//   const [user, setUser]= useState(null);
//   const [error, setError]= useState("");

//   console.log(user);
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
//             console.log(error)
//           }
//         }
//       };
//       fetchUser();
//   }, [])
//   return (
//     <>
//       <PageMeta
//         title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//         description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <AuthLayout>
//         <SignUpForm setUser={setUser}/>
//       </AuthLayout>
//     </>
//   );
// }
