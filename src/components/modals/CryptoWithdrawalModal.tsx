// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Modal from "./Modal";
// // import { Button } from "@/components/ui/button";
// import Button from "../../components/ui/button/Button";


// interface CryptoWithdrawalModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   withdrawalAmount: number;
// }

// interface BankDetailsResponse {
//   bankDetails?: {
//     feePerUSDT: number;
//   };
// }

// interface UserProfileResponse {
//   _id: string;
// }

// const CryptoWithdrawalModal: React.FC<CryptoWithdrawalModalProps> = ({
//   isOpen,
//   onClose,
//   withdrawalAmount,
// }) => {
//   const [coinType, setCoinType] = useState<string>("");
//   const [walletAddress, setWalletAddress] = useState<string>("");
//   const [network, setNetwork] = useState<string>("");
//   const [amountToReceive, setAmountToReceive] = useState<number>(0);
//   const [feePerUSDT, setFeePerUSDT] = useState<number>(0);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   // Fetch conversion fee details
//   useEffect(() => {
//     const fetchCryptoDetails = async () => {
//       try {
//         const res = await axios.get<BankDetailsResponse>(
//           `http://localhost:8000/api/admin/bank-details/first`
//         );
//         if (res.data?.bankDetails) {
//           const fee = res.data.bankDetails.feePerUSDT;
//           setFeePerUSDT(fee);
//           setAmountToReceive(
//             withdrawalAmount - withdrawalAmount * (fee / 100)
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching crypto details", err);
//       }
//     };
//     if (isOpen) fetchCryptoDetails();
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
//     if (!coinType || !walletAddress || !network || !userId) {
//       console.error("Please fill all crypto details.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await axios.post(`http://localhost:8000/api/${userId}/withdraw/crypto`, {
//         amount: withdrawalAmount,
//         coinType,
//         amountToReceive,
//         cryptoAddress: walletAddress,
//         transactionHash: network,
//         feePerUSDT,
//       });
//       setIsSubmitting(false);
//       onClose();
//     } catch (error) {
//       console.error("Error submitting crypto withdrawal:", error);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Crypto">
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         {/* Amount */}
//         <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Amount to Withdraw:
//           </p>
//           <p className="font-bold text-lg text-green-600 dark:text-green-400">
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

//         {/* Coin Type */}
//         <div>
//           <label className="block text-sm mb-1">Coin Type</label>
//           <input
//             type="text"
//             className="w-full rounded-lg border px-3 py-2"
//             value={coinType}
//             onChange={(e) => setCoinType(e.target.value)}
//             required
//           />
//         </div>

//         {/* Wallet Address */}
//         <div>
//           <label className="block text-sm mb-1">Wallet Address</label>
//           <input
//             type="text"
//             className="w-full rounded-lg border px-3 py-2"
//             value={walletAddress}
//             onChange={(e) => setWalletAddress(e.target.value)}
//             required
//           />
//         </div>

//         {/* Network */}
//         <div>
//           <label className="block text-sm mb-1">Network</label>
//           <input
//             type="text"
//             className="w-full rounded-lg border px-3 py-2"
//             value={network}
//             onChange={(e) => setNetwork(e.target.value)}
//             required
//           />
//         </div>

//         <Button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-green-600 hover:bg-green-700 w-full py-3 rounded-xl mt-6"
//         >
//           {isSubmitting ? "Processing..." : "Confirm Crypto Withdrawal"}
//         </Button>
//       </form>
//     </Modal>
//   );
// };
// export default CryptoWithdrawalModal;