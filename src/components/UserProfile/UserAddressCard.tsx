"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

// ✅ Define Address type
interface Address {
  country?: string;
  state?: string;
  homeAddress?: string;
  phoneNumber?: string;
}

// ✅ Define props for UserAddressCard
interface UserAddressCardProps {
  profileAddress: Address | null;
  updateUserAddress: (address: Address) => void;
  isLoading: boolean;
}

export default function UserAddressCard({
  profileAddress,
  updateUserAddress,
  isLoading,
}: UserAddressCardProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState<Address>({
    country: "",
    state: "",
    homeAddress: "",
    phoneNumber: "",
  });

  // ✅ Keep form synced with profileAddress
  useEffect(() => {
    if (profileAddress) {
      setFormData({
        country: profileAddress.country || "",
        state: profileAddress.state || "",
        homeAddress: profileAddress.homeAddress || "",
        phoneNumber: profileAddress.phoneNumber || "",
      });
    }
  }, [profileAddress]);

  // ✅ Change event handler with proper typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Save handler with proper typing
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      // Update backend
      const res = await axios.put<Address>(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/edit-address`,
        formData,
        {
          headers: { "x-auth-token": token },
        }
      );

      // Update parent with backend response
      updateUserAddress(res.data);
      closeModal();
      console.log("Address updated successfully!", res.data);
    } catch (err) {
      console.error("Failed to update address:", err);
    }
  };

  if (isLoading) {
    return <p>Loading address...</p>;
  }

  if (!profileAddress) {
    return <p>Address not available. Please add one.</p>;
  }

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Address
            </h4>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Country</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profileAddress.country || "N/A"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">City/State</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profileAddress.state || "N/A"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Home Address</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profileAddress.homeAddress || "N/A"}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {profileAddress.phoneNumber || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:inline-flex lg:w-auto"
          >
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Address
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Country</Label>
                  <Input type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div>
                  <Label>City/State</Label>
                  <Input type="text" name="state" value={formData.state} onChange={handleChange} />
                </div>
                <div>
                  <Label>Home Address</Label>
                  <Input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}











// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useModal } from "../../hooks/useModal";
// import { Modal } from "../ui/modal";
// import Button from "../ui/button/Button";
// import Input from "../form/input/InputField";
// import Label from "../form/Label";

// export default function UserAddressCard({ profileAddress, updateUserAddress, isLoading }) {
//   const { isOpen, openModal, closeModal } = useModal();
//   const [formData, setFormData] = useState({
//     country: "",
//     state: "",
//     homeAddress: "",
//     phoneNumber: "",
//   });

//   // Keep form synced with profileAddress
//   useEffect(() => {
//     if (profileAddress) {
//       setFormData({
//         country: profileAddress.country || "",
//         state: profileAddress.state || "",
//         homeAddress: profileAddress.homeAddress || "",
//         phoneNumber: profileAddress.phoneNumber || "",
//       });
//     }
//   }, [profileAddress]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.error("No token found.");
//         return;
//       }

//       // Update backend
//       const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/edit-address`, formData, {
//         headers: { "x-auth-token": token },
//       });

//       // Update parent with backend response
//       updateUserAddress(res.data);
//       closeModal();
//       console.log("Address updated successfully!", res.data);
//     } catch (err) {
//       console.error("Failed to update address:", err);
//     }
//   };

//   if (isLoading) {
//     return <p>Loading address...</p>;
//   }

//   if (!profileAddress) {
//     return <p>Address not available. Please add one.</p>;
//   }

//   return (
//     <>
//       <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
//         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//           <div>
//             <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
//               Address
//             </h4>
//             <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
//               <div>
//                 <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Country</p>
//                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                   {profileAddress.country || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">City/State</p>
//                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                   {profileAddress.state || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Home Address</p>
//                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                   {profileAddress.homeAddress || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Phone Number</p>
//                 <p className="text-sm font-medium text-gray-800 dark:text-white/90">
//                   {profileAddress.phoneNumber || "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={openModal}
//             className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 lg:inline-flex lg:w-auto"
//           >
//             Edit
//           </button>
//         </div>
//       </div>

//       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
//         <div className="relative w-full p-4 bg-white rounded-3xl dark:bg-gray-900 lg:p-11">
//           <div className="px-2 pr-14">
//             <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
//               Edit Address
//             </h4>
//             <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
//               Update your details to keep your profile up-to-date.
//             </p>
//           </div>
//           <form className="flex flex-col">
//             <div className="px-2">
//               <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
//                 <div>
//                   <Label>Country</Label>
//                   <Input type="text" name="country" value={formData.country} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <Label>City/State</Label>
//                   <Input type="text" name="state" value={formData.state} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <Label>Home Address</Label>
//                   <Input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleChange} />
//                 </div>
//                 <div>
//                   <Label>Phone Number</Label>
//                   <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
//               <Button size="sm" variant="outline" onClick={closeModal}>
//                 Close
//               </Button>
//               <Button size="sm" onClick={handleSave}>
//                 Save Changes
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </>
//   );
// }
