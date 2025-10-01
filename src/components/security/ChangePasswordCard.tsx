import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface ChangePasswordCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  actionColor: "blue" | "green";
}

const actionColors = {
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  green: "bg-green-600 text-white hover:bg-green-700",
};

export default function ChangePasswordCard({
  title,
  description,
  icon,
  actionText,
  actionColor,
}: ChangePasswordCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("❌ New password and confirm password do not match!");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ No token found. Please log in again.");
        return;
      }

      const res = await fetch(`http://localhost:8000/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.msg || "Failed to change password"}`);
        return;
      }

      setMessage("✅ Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close modal after a short delay
      setTimeout(() => {
        closeModal();
        setMessage(null);
      }, 1500);
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col h-full">
        <div className="mb-4">{icon}</div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            className={`w-full ${actionColors[actionColor]} rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300`}
            onClick={openModal}
          >
            {actionText}
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {title}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your account password to keep your account secure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {message && (
              <p
                className={`text-sm mt-2 ${
                  message.startsWith("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <div className="mt-6 flex items-center gap-3 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal} disabled={loading}>
                Cancel
              </Button>
              <Button size="sm" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}














// import React, { useState } from "react";
// import { useModal } from "../../hooks/useModal";
// import { Modal } from "../ui/modal";
// import Button from "../ui/button/Button";
// import { FaFingerprint } from "react-icons/fa";



// export default function ChangePasswordCard() {
//   const { isOpen, openModal, closeModal } = useModal();
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMessage("❌ New password and confirm password do not match!");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage(null);

//       const token = localStorage.getItem("token");
//       if (!token) {
//         setMessage("❌ No token found. Please log in again.");
//         return;
//       }

//       const res = await fetch(`http://localhost:8000/api/change-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-auth-token": token,
//         },
//         body: JSON.stringify({
//           currentPassword,
//           newPassword,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage(`❌ ${data.msg || "Failed to change password"}`);
//         return;
//       }

//       setMessage("✅ Password changed successfully!");
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");

//       // Close modal after a short delay
//       setTimeout(() => {
//         closeModal();
//         setMessage(null);
//       }, 1500);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       setMessage("❌ An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//       <div className="flex flex-col h-full">
//         <div className="mb-4">
//           <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
//             <FaFingerprint size={32} className="text-green-500 dark:text-green-300" />
//           </div>
//         </div>
//         <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
//           Change Password
//         </h4>
//         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//           Do you think your account is compromised?
//         </p>
//         <div className="mt-auto pt-4">
//           <Button
//             size="sm"
//             className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300"
//             onClick={openModal}
//           >
//             Change Password
//           </Button>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
//         <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
//           <div className="px-2 pr-14">
//             <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
//               Change Password
//             </h4>
//             <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
//               Update your account password to keep your account secure.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 required
//                 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//                 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>

//             {message && (
//               <p
//                 className={`text-sm mt-2 ${
//                   message.startsWith("✅") ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {message}
//               </p>
//             )}

//             <div className="mt-6 flex items-center gap-3 lg:justify-end">
//               <Button size="sm" variant="outline" onClick={closeModal} disabled={loading}>
//                 Cancel
//               </Button>
//               <Button size="sm" type="submit" disabled={loading}>
//                 {loading ? "Saving..." : "Save Changes"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// }











