// import React from "react";
// // import { XIcon } from "./XIcon"; // adjust import path

// // Interface for Bank Details
// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   accountHolderName: string;
//   usdtRate: number;       // conversion rate USD -> NGN
//   feePerUSDT?: number;    // fee percentage
// }

// // Payload interface for submission
// interface DepositPayload {
//   amount: number;           // in USD/USDT
//   bankName: string;
//   accountNumber: string;
//   accountHolderName: string;
//   feePerUSDT: number;
//   amountToReceive: number;  // USD/USDT after fee
// }

// // Props interface for BankPaymentModal
// interface BankPaymentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   amountGBP: number; // deposit amount (actually USD/USDT in your logic)
//   bankDetails?: BankDetails;
//   onSubmitDeposit: (payload: DepositPayload) => void;
//   isSubmitting: boolean;
// }

// const BankPaymentModal: React.FC<BankPaymentModalProps> = ({
//   isOpen,
//   onClose,
//   amountGBP,
//   bankDetails,
//   onSubmitDeposit,
//   isSubmitting,
// }) => {
//   if (!isOpen || !bankDetails) return null;

//   // Constants & Calculations
//   const NGN_RATE: number = bankDetails.usdtRate;
//   const depositAmountUSD: number = Number(amountGBP) || 0;
//   const feePerUSDT: number = bankDetails.feePerUSDT ?? 0;

//   // Fee and received amount
//   const feeUSD: number = depositAmountUSD * (feePerUSDT / 100);
//   const amountToReceive: number = depositAmountUSD - feeUSD;

//   // Convert to NGN
//   const amountToReceiveNGN: string = (amountToReceive * NGN_RATE).toLocaleString("en-US", {
//     maximumFractionDigits: 0,
//   });

//   // Submission handler
//   const handleSubmission = (): void => {
//     if (!bankDetails || depositAmountUSD <= 0) {
//       console.error("Missing required bank details or deposit amount.");
//       return;
//     }

//     const payload: DepositPayload = {
//       amount: depositAmountUSD,
//       bankName: bankDetails.bankName,
//       accountNumber: bankDetails.accountNumber,
//       accountHolderName: bankDetails.accountHolderName,
//       feePerUSDT: feePerUSDT,
//       amountToReceive: amountToReceive,
//     };

//     console.log("Submitting deposit payload:", payload);
//     onSubmitDeposit(payload);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
//         >
//           {/* <XIcon className="size-6" /> */}
//         </button>

//         {/* Header */}
//         <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
//           Confirm Bank Deposit
//         </h2>
//         <p className="text-sm text-center text-gray-600 mb-6">
//           Please transfer <strong>${depositAmountUSD.toFixed(2)} USD</strong> to the account details below.
//         </p>

//         {/* Transfer Details */}
//         <h3 className="mt-4 mb-2 font-semibold text-gray-800">TRANSFER DETAILS</h3>
//         <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Account Name</span>
//             <span className="font-semibold text-gray-800">{bankDetails.accountHolderName || "N/A"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Bank Name</span>
//             <span className="font-semibold text-gray-800">{bankDetails.bankName || "N/A"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Account No.</span>
//             <span className="font-semibold text-gray-800">{bankDetails.accountNumber || "N/A"}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Fee per USDT</span>
//             <span className="font-semibold text-red-600">{feePerUSDT}%</span>
//           </div>
//         </div>

//         {/* Conversion Summary */}
//         <div className="mt-4 border-t pt-3">
//           <h3 className="mb-1 font-semibold text-gray-800">Conversion Summary</h3>
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Total Amount Deposited</span>
//             <span>${depositAmountUSD.toFixed(2)} USD</span>
//           </div>
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Fee Deducted ({feePerUSDT}%)</span>
//             <span>-${feeUSD.toFixed(2)} USD</span>
//           </div>
//           <div className="flex justify-between items-center mt-3 pt-2 border-t font-bold text-lg text-gray-800">
//             <span>You will Receive</span>
//             <div className="text-right">
//               <p className="text-green-600">${amountToReceive.toFixed(2)}</p>
//               <p className="text-xs text-gray-500">~ NGN {amountToReceiveNGN}</p>
//             </div>
//           </div>
//           <p className="text-xs text-gray-500 text-right mt-1">Rate: $1 = NGN {NGN_RATE}</p>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleSubmission}
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Submitting..." : "I have completed the transfer →"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BankPaymentModal;
