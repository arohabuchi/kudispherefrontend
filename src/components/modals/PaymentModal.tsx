// import React from "react";
// import { XIcon } from "./XIcon"; // adjust the import path for your icon

// interface CoinData {
//   name: string;
//   image?: string;
// }

// interface PaymentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   amountGBP: number;
//   coinData?: CoinData;
//   userId: string;
//   coinType: string;
//   fetchProfile: () => Promise<void>;
// }

// const PaymentModal: React.FC<PaymentModalProps> = ({
//   isOpen,
//   onClose,
//   amountGBP,
//   coinData,
//   userId,
//   coinType,
//   fetchProfile,
// }) => {
//   if (!isOpen) return null;

//   const btcRate = 42142.11; // Example static rate
//   const amountUSD = Number(amountGBP);
//   const btcAmount = amountUSD ? (amountUSD / btcRate).toFixed(8) : "0";

//   const handleDeposit = async (): Promise<void> => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`http://localhost:8000/api/${userId}/deposit`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-auth-token": token || "",
//         },
//         body: JSON.stringify({
//           amount: amountUSD,
//           coinType: coinType,
//           cryptoAddress: coinData?.name,
//           transactionHash: "null", // Placeholder
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to submit deposit");

//       const data = await res.json();
//       console.log("Deposit submitted:", data);

//       await fetchProfile();
//       console.log("Deposit submitted successfully!");
//       onClose();
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Error submitting deposit:", error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
//         >
//           <XIcon className="size-6" />
//         </button>

//         <div className="space-y-6">
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Crypto Deposit</h2>

//           {/* Address + Frequency */}
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm font-medium text-gray-700">Please Send to Address</p>
//               <div className="flex items-center space-x-2">
//                 <p className="text-xs text-gray-500 break-all">
//                   {coinData?.name || "Loading..."}
//                 </p>

//                 {/* Copy Button */}
//                 <button
//                   onClick={() => {
//                     if (coinData?.name) {
//                       navigator.clipboard.writeText(coinData.name);
//                       console.log("Copied to clipboard!");
//                     }
//                   }}
//                   className="text-green-600 hover:text-green-800 text-xs font-medium"
//                 >
//                   Copy
//                 </button>
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700 mr-2">Payment Frequency</label>
//               <select className="border rounded px-2 py-1 text-sm">
//                 <option>Monthly</option>
//                 <option>Weekly</option>
//               </select>
//             </div>
//           </div>

//           {/* QR + Details */}
//           <div className="flex space-x-6">
//             <div>
//               {coinData?.image ? (
//                 <img
//                   src={`http://localhost:8000/${coinData.image}`}
//                   alt={`${coinData.name} QR Code`}
//                   className="w-36 h-36"
//                   onError={(e) => {
//                     (e.currentTarget as HTMLImageElement).src =
//                       "https://placehold.co/144x144/22c55e/ffffff?text=QR+Code+Missing";
//                   }}
//                 />
//               ) : (
//                 <p className="text-xs text-gray-400 w-36 h-36 flex items-center justify-center border rounded">
//                   Loading QR...
//                 </p>
//               )}
//             </div>
//             <div className="bg-gray-50 rounded-xl p-4 flex-1">
//               <p className="font-semibold">Total Deposit</p>
//               <p className="text-xl font-bold">
//                 ${amountUSD.toFixed(2) || 0} USD
//               </p>
//               <p className="mt-2 text-sm">Amount in {coinType}</p>
//               <p className="font-mono">
//                 {btcAmount} {coinType}
//               </p>
//               <button
//                 onClick={handleDeposit}
//                 className="mt-4 w-full bg-purple-600 text-white rounded-lg py-2 font-medium hover:bg-purple-700 transition-colors"
//               >
//                 Open in Wallet
//               </button>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex justify-between text-xs text-gray-500">
//             <p>
//               Time Remaining:{" "}
//               <span className="font-semibold text-purple-600">15:32</span>
//             </p>
//             <p>1 BTC = {btcRate.toLocaleString()} GBP</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;
// // 