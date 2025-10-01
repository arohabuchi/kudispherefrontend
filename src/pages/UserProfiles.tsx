import { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";

// Match backend ProfileAddress schema
export interface ProfileAddress {
  country?: string;
  state?: string;
  homeAddress?: string;
  phoneNumber?: string;
}

// Match backend User schema
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
  amount: number;
  payout: number;
  profileAddress?: ProfileAddress; // optional if not populated yet
}

export default function UserProfiles() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      let token = localStorage.getItem("token");

      // Handle JSON stringified token case
      if (token && token.startsWith("{")) {
        try {
          const parsedToken = JSON.parse(token);
          token = parsedToken.token;
        } catch (e) {
          console.error("Failed to parse token from localStorage", e);
          localStorage.removeItem("token");
          setIsLoading(false);
          return;
        }
      }

      if (token) {
        try {
          const res = await axios.get<User>(`http://localhost:8000/api/profile`, {
            headers: { "x-auth-token": token },
          });
          console.log("Fetched user:", res.data);
          setUser(res.data);
        } catch (err) {
          console.error("Fetch user error:", err);
          setError("Failed to fetch user data");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No valid token found.");
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Function to update the user state with the backend response
  const updateUserAddress = (newAddress: ProfileAddress): void => {
    setUser((prevUser) =>
      prevUser
        ? { ...prevUser, profileAddress: { ...newAddress } }
        : prevUser
    );
  };

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard user={user} error={error} isLoading={isLoading} />
          {/* Pass profileAddress and the update function */}
          <UserAddressCard
            profileAddress={user?.profileAddress}
            updateUserAddress={updateUserAddress}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
























// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import UserMetaCard from "../components/UserProfile/UserMetaCard";
// import UserInfoCard from "../components/UserProfile/UserInfoCard";
// import UserAddressCard from "../components/UserProfile/UserAddressCard";
// import PageMeta from "../components/common/PageMeta";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function UserProfiles() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       let token = localStorage.getItem("token");

//       // Handle JSON stringified token case
//       if (token && token.startsWith("{")) {
//         try {
//           const parsedToken = JSON.parse(token);
//           token = parsedToken.token;
//         } catch (e) {
//           console.error("Failed to parse token from localStorage", e);
//           localStorage.removeItem("token");
//           setIsLoading(false);
//           return;
//         }
//       }

//       if (token) {
//         try {
//           const res = await axios.get(`http://localhost:8000/api/profile`, {
//             headers: { "x-auth-token": token },
//           });
//           console.log("Fetched user:", res.data);
//           setUser(res.data);
//         } catch (err) {
//           console.error("Fetch user error:", err);
//           setError("Failed to fetch user data");
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         console.log("No valid token found.");
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Function to update the user state with the backend response
//   const updateUserAddress = (newAddress) => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       profileAddress: { ...newAddress }, // replace with backend’s latest data
//     }));
//   };

//   return (
//     <>
//       <PageMeta
//         title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//         description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <PageBreadcrumb pageTitle="Profile" />
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//         <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
//           Profile
//         </h3>
//         <div className="space-y-6">
//           <UserMetaCard />
//           <UserInfoCard user={user} error={error} isLoading={isLoading} />
//           {/* Pass profileAddress and the update function */}
//           <UserAddressCard
//             profileAddress={user?.profileAddress}
//             updateUserAddress={updateUserAddress}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>
//     </>
//   );
// }