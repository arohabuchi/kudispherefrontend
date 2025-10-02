import { useState, useEffect } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import axios, { AxiosError } from "axios";

// ---- Define User type (shape of backend profile response) ----
interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      let token: string | null = localStorage.getItem("token");

      // Handle JSON stringified token
      if (token && token.startsWith("{")) {
        try {
          const parsedToken = JSON.parse(token) as { token: string };
          token = parsedToken.token;
        } catch (e) {
          console.error("Failed to parse token", e);
          localStorage.removeItem("token");
          setIsLoading(false);
          return;
        }
      }

      if (token) {
        try {
          const res = await axios.get<User>(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
            headers: { "x-auth-token": token },
          });
          setUser(res.data); // ✅ typed response
        } catch (err) {
          const error = err as AxiosError;
          console.error("Fetch user error:", error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  function toggleDropdown(): void {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown(): void {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="block mr-1 font-medium text-theme-sm">
          {isLoading ? "Loading..." : user?.firstName || "Guest"}
        </span>
        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.firstName || "Unknown User"} {user?.lastName || "Unknown User"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            {user?.email || "No email"}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              to="/profile"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              to="/support"
              className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Support
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}










// import { useState, useEffect } from "react";
// import { DropdownItem } from "../ui/dropdown/DropdownItem";
// import { Dropdown } from "../ui/dropdown/Dropdown";
// import { Link } from "react-router";
// import axios from "axios";

// export default function UserDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user on mount
//   useEffect(() => {
//     const fetchUser = async () => {
//       let token = localStorage.getItem("token");

//       // Handle JSON stringified token
//       if (token && token.startsWith("{")) {
//         try {
//           const parsedToken = JSON.parse(token);
//           token = parsedToken.token;
//         } catch (e) {
//           console.error("Failed to parse token", e);
//           localStorage.removeItem("token");
//           setIsLoading(false);
//           return;
//         }
//       }

//       if (token) {
//         try {
//           const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
//             headers: { "x-auth-token": token },
//           });
//           setUser(res.data); // save user
//         } catch (err) {
//           console.error("Fetch user error:", err);
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   function toggleDropdown() {
//     setIsOpen(!isOpen);
//   }

//   function closeDropdown() {
//     setIsOpen(false);
//   }

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
//       >
//         <span className="block mr-1 font-medium text-theme-sm">
//           {isLoading ? "Loading..." : user?.firstName || "Guest"}
//         </span>
//         <svg
//           className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//           width="18"
//           height="20"
//           viewBox="0 0 18 20"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>

//       <Dropdown
//         isOpen={isOpen}
//         onClose={closeDropdown}
//         className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
//       >
//         <div>
//           <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
//             {user?.firstName || "Unknown User"} {user?.lastName || "Unknown User"}
//           </span>
//           <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
//             {user?.email || "No email"}
//           </span>
//         </div>

//         <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
//           <li>
//             <DropdownItem
//               onItemClick={closeDropdown}
//               tag="a"
//               to="/profile"
//               className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               Edit profile
//             </DropdownItem>
//           </li>
//           <li>
//             <DropdownItem
//               onItemClick={closeDropdown}
//               tag="a"
//               to="/support"
//               className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
//             >
//               Support
//             </DropdownItem>
//           </li>
//         </ul>

        
//       </Dropdown>
//     </div>
//   );
// }
















