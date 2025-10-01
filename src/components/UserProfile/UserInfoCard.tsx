import React from "react";


interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserInfoCardProps {
  user: User | null;
  error?: string | null;
  isLoading: boolean;
}

export default function UserInfoCard({
  user,
  error,
  isLoading,
}: UserInfoCardProps) {


  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {user ? (
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.firstName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.lastName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email address
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}












// import { useModal } from "../../hooks/useModal";
// import { Modal } from "../ui/modal";
// import Button from "../ui/button/Button";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";



// export default function UserInfoCard({user, error, isLoading}) {
//   const { isOpen, openModal, closeModal } = useModal();
//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Saving changes...");
//     closeModal();
//   };
//   if (isLoading) {
//     return <p>Loading user data...</p>;
//   }
//   return (
//     <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
//       {error && <p className="text-red-500 text-sm">{error}</p>
//       }

//       {user ? (
//       <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//         <div>
//           <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
//             Personal Information
//           </h4>

//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 First Name
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 {user.firstName}
//               </p>
//             </div>

//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 Last Name
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 {user.lastName}
//               </p>
//             </div>

//             <div>
//               <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
//                 Email address
//               </p>
//               <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                 {user.email}
//               </p>
//             </div>

//           </div>
//         </div>

//       </div>

//       ):(
//         <>


//         </>
//       )}

//     </div>
//   );
// }
