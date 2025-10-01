import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios"; // ✅ import AxiosError
import Button from "../ui/button/Button";
import { FaFingerprint } from "react-icons/fa";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();

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

      const res = await axios.post<{ msg: string }>(
        `http://localhost:8000/api/reset-password/${token}`,
        { password: newPassword }
      );

      setMessage("✅ " + res.data.msg);

      // redirect to login after a delay
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error: unknown) {
      const err = error as AxiosError<{ msg?: string; error?: string }>;
      console.error("Error resetting password:", err);

      const errMsg =
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "❌ An error occurred.";

      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
            <FaFingerprint size={32} className="text-green-500 dark:text-green-300" />
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Reset Password
        </h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
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
            <Button size="sm" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}















// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Button from "../ui/button/Button";
// import { FaFingerprint } from "react-icons/fa";

// export default function ResetPasswordForm() {
//   const { token } = useParams(); // capture reset token from URL
//   const navigate = useNavigate();

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

//       const res = await axios.post(
//         `http://localhost:8000/api/reset-password/${token}`,
//         { password: newPassword }
//       );

//       setMessage("✅ " + res.data.msg);

//       // redirect to login after a delay
//       setTimeout(() => {
//         navigate("/signin");
//       }, 2000);
//     } catch (error: any) {
//       console.error("Error resetting password:", error);
//       const errMsg =
//         error.response?.data?.msg ||
//         error.response?.data?.error ||
//         "❌ An error occurred.";
//       setMessage(errMsg);
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
//           Reset Password
//         </h4>
//         <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//           Enter your new password below.
//         </p>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//               className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {message && (
//             <p
//               className={`text-sm mt-2 ${
//                 message.startsWith("✅") ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}

//           <div className="mt-6 flex items-center gap-3 lg:justify-end">
//             <Button size="sm" type="submit" disabled={loading}>
//               {loading ? "Saving..." : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
