// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "./Modal";
// import Button from "../../components/ui/button/Button";
// ////components/ui/button";

// interface BankWithdrawalModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   withdrawalAmount: number;
// }

// interface BankDetailsResponse {
//   bankDetails?: {
//     feePerUSDT?: number;
//   };
// }

// interface UserProfileResponse {
//   _id: string;
// }

// const BankWithdrawalModal: React.FC<BankWithdrawalModalProps> = ({
//   isOpen,
//   onClose,
//   withdrawalAmount,
// }) => {
//   const [bankName, setBankName] = useState<string>("");
//   const [accountNumber, setAccountNumber] = useState<string>("");
//   const [accountHolderName, setAccountHolderName] = useState<string>("");
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [feePerUSDT, setFeePerUSDT] = useState<number>(0);
//   const [amountToReceive, setAmountToReceive] = useState<number>(0);
//   const [userId, setUserId] = useState<string | null>(null);

//   // Fetch conversion details
//   useEffect(() => {
//     const fetchBankDetails = async () => {
//       try {
//         const res = await axios.get<BankDetailsResponse>(
//           `http://localhost:8000/api/admin/bank-details/first`
//         );
//         if (res.data?.bankDetails) {
//           const fee = res.data.bankDetails.feePerUSDT || 0;
//           setFeePerUSDT(fee);
//           setAmountToReceive(withdrawalAmount - withdrawalAmount * (fee / 100));
//         }
//       } catch (err) {
//         console.error("Error fetching bank details", err);
//       }
//     };
//     if (isOpen) fetchBankDetails();
//   }, [isOpen, withdrawalAmount]);

//   // Fetch logged-in user ID
//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const res = await axios.get<UserProfileResponse>(
//           `http://localhost:8000/api/profile`,
//           {
//             headers: { "x-auth-token": token },
//           }
//         );
//         setUserId(res.data._id);
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//       }
//     };
//     if (isOpen) fetchUserId();
//   }, [isOpen]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!bankName || !accountNumber || !accountHolderName || !userId) {
//       console.error("Please fill all bank details.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await axios.post(`http://localhost:8000/api/${userId}/withdraw/bank`, {
//         amount: withdrawalAmount,
//         bankName,
//         accountNumber,
//         accountHolderName,
//         amountToReceive,
//         feePerUSDT,
//       });
//       setIsSubmitting(false);
//       onClose();
//     } catch (error) {
//       console.error("Error submitting bank withdrawal:", error);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Transfer to Bank Account">
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         {/* Amount */}
//         <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Amount to Withdraw:
//           </p>
//           <p className="font-bold text-lg text-red-600 dark:text-red-400">
//             ${Number(withdrawalAmount).toFixed(2)}
//           </p>
//         </div>

//         {/* Transaction Summary */}
//         <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Fee per USDT: {feePerUSDT}%
//           </p>
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Amount to Receive: ${amountToReceive.toFixed(2)}
//           </p>
//         </div>

//         {/* Bank Name */}
//         <div>
//           <label className="block text-sm mb-1">Bank Name</label>
//           <input
//             type="text"
//             className="w-full rounded-lg border px-3 py-2"
//             value={bankName}
//             onChange={(e) => setBankName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Account Number */}
//         <div>
//           <label className="block text-sm mb-1">Account Number</label>
//           <input
//             type="text"
//             className="w-full rounded-lg border px-3 py-2"
//             value={accountNumber}
//             onChange={(e) => setAccountNumber(e.target.value)}
//             required
//           />
//         </div>

//         {/* Account Holder's Name */}
//         <div>
//           <label className="block text-sm mb-1">Account Holder's Name</label>
//           <input
//             type="text"
//             className="w-full rounded-lg border px-3 py-2"
//             value={accountHolderName}
//             onChange={(e) => setAccountHolderName(e.target.value)}
//             required
//           />
//         </div>

//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-red-600 hover:bg-red-700 w-full py-3 rounded-xl mt-6"
//         >
//           {isSubmitting ? "Processing..." : "Confirm Bank Transfer"}
//         </Button>
//       </form>
//     </Modal>
//   );
// };
// export default BankWithdrawalModal