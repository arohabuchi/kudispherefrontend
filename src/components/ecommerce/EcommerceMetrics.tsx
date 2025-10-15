// import { useState, useEffect } from "react";
import React, { useState, useEffect, FormEvent } from "react";


import axios from "axios";
// --- Icons ---

// ✅ Strongly typed with React.SVGProps
type IconProps = React.SVGProps<SVGSVGElement>;

export const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// const ArrowDownIcon = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
//   </svg>
// );

// const ArrowUpIcon = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
//   </svg>
// );

// const XIcon = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//   </svg>
// );


// --- Reusable Components ---

// Badge button
// const Badge = ({ children, color, onClick }) => {
//   const colorClasses = {
//     success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
//     error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
//   };
//   return (
//     <button
//       onClick={onClick}
//       className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}
//     >
//       {children}
//     </button>
//   );
// };


interface BadgeProps {
  children: React.ReactNode;
  color: "success" | "error";
  onClick?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ children, color, onClick }) => {
  const colorClasses: Record<"success" | "error", string> = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </button>
  );
};


// Button
// const Button = ({ children, className, onClick, type = "button", disabled }) => (
//   <button
//     type={type}
//     onClick={onClick}
//     disabled={disabled}
//     className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${
//       disabled ? "bg-gray-400 cursor-not-allowed" : className
//     }`}
//   >
//     {children}
//   </button>
// );

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

 const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 ${
      disabled ? "bg-gray-400 cursor-not-allowed" : className
    }`}
  >
    {children}
  </button>
);



// Generic Modal
// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
//         >
//           <XIcon className="size-6" />
//         </button>

//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
//         {children}
//       </div>
//     </div>
//   );
// };
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

 const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full mx-auto 
max-w-xs sm:max-w-lg md:max-w-2xl 
p-4 sm:p-6 lg:p-10 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
        >
          <XIcon className="size-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};



// --- Deposit Modals (Existing/Modified) ---

// Payment Modal (Crypto Deposit) - Retained structure for deposit flow
// const PaymentModal = ({ isOpen, onClose, amountGBP, coinData, userId, coinType, fetchProfile }) => {
//   if (!isOpen) return null;

//   const btcRate = 42142.11; // example static rate
//   // Assuming the deposit amount is in USD, despite the prop name 'amountGBP'
//   const amountUSD = Number(amountGBP);
//   const btcAmount = amountUSD ? (amountUSD / btcRate).toFixed(8) : "0";

//   const handleDeposit = async () => {
//     try {
//       // NOTE: For brevity, keeping the original backend call structure (using localStorage and alert)
//       // but in a real app, replace alert() with a custom modal UI.
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/deposit`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-auth-token": token,
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

//       // IMPORTANT: Replace alert with a custom modal UI in a real app
//       console.log("Deposit submitted successfully!"); 
//       onClose();
//     } catch (error) {
//       console.error("Error submitting deposit:", error.message);
//       // IMPORTANT: Replace alert with a custom modal UI in a real app
//       console.error("Error submitting deposit");
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
//                       document.execCommand('copy'); 
//                       // IMPORTANT: Replace alert with a custom modal UI in a real app
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
//                   src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${coinData.image}`}
//                   alt={`${coinData.name} QR Code`}
//                   className="w-36 h-36"
//                   onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/144x144/22c55e/ffffff?text=QR+Code+Missing" }} // Added fallback
//                 />
//               ) : (
//                 <p className="text-xs text-gray-400 w-36 h-36 flex items-center justify-center border rounded">Loading QR...</p>
//               )}
//             </div>
//             <div className="bg-gray-50 rounded-xl p-4 flex-1">
//               <p className="font-semibold">Total Deposit</p>
//               <p className="text-xl font-bold">${amountUSD.toFixed(2) || 0} USD</p>
//               <p className="mt-2 text-sm">Amount in {coinType}</p>
//               <p className="font-mono">{btcAmount} {coinType}</p>
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
interface CoinData {
  name?: string;
  image?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountGBP: number;
  coinData?: CoinData;
  userId: string;
  coinType: string;
  fetchProfile: () => Promise<void>;
}

 const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amountGBP,
  coinData,
  userId,
  coinType,
  fetchProfile,
}) => {
  if (!isOpen) return null;

  const btcRate = 42142.11; // example static rate
  const amountUSD: number = Number(amountGBP);
  const btcAmount: string = amountUSD ? (amountUSD / btcRate).toFixed(8) : "0";

  const handleDeposit = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token || "",
        },
        body: JSON.stringify({
          amount: amountUSD,
          coinType: coinType,
          cryptoAddress: coinData?.name,
          transactionHash: "null", // Placeholder
        }),
      });

      if (!res.ok) throw new Error("Failed to submit deposit");

      const data = await res.json();
      console.log("Deposit submitted:", data);

      await fetchProfile();
      console.log("Deposit submitted successfully!");
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting deposit:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
        >
          <XIcon className="size-6" />
        </button>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Crypto Deposit</h2>

          {/* Address + Frequency */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">Please Send to Address</p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-gray-500 break-all">
                  {coinData?.name || "Loading..."}
                </p>

                {/* Copy Button */}
                <button
                  onClick={() => {
                    if (coinData?.name) {
                      navigator.clipboard.writeText(coinData.name);
                      console.log("Copied to clipboard!");
                    }
                  }}
                  className="text-green-600 hover:text-green-800 text-xs font-medium"
                >
                  Copy
                </button>
              </div>
            </div>
           
          </div>

          {/* QR + Details */}
          <div className="flex space-x-6">
            <div>
              {coinData?.image ? (
                <img
                  src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${coinData.image}`}
                  alt={`${coinData.name} QR Code`}
                  className="w-36 h-36"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://placehold.co/144x144/22c55e/ffffff?text=QR+Code+Missing";
                  }}
                />
              ) : (
                <p className="text-xs text-gray-400 w-36 h-36 flex items-center justify-center border rounded">
                  Loading QR...
                </p>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex-1">
              <p className="font-semibold">Total Deposit</p>
              <p className="text-xl font-bold">${amountUSD.toFixed(2) || 0} USD</p>
              <p className="mt-2 text-sm">Amount in {coinType}</p>
              <p className="font-mono">
                {btcAmount} {coinType}
              </p>
              <button
                onClick={handleDeposit}
                className="mt-4 w-full bg-purple-600 text-white rounded-lg py-2 font-medium hover:bg-purple-700 transition-colors"
              >
                I Have Paid
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between text-xs text-gray-500">
            
            {/* <p>1 BTC = {btcRate.toLocaleString()} GBP</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};



// Bank Payment Modal (Bank Deposit) - Retained structure for deposit flow
// const BankPaymentModal = ({ isOpen, onClose, amountGBP, bankDetails, onSubmitDeposit, isSubmitting }) => {
//   if (!isOpen || !bankDetails) return null;

//   // Constants and Calculations (assuming amountGBP is the deposit amount in USD)
//   const NGN_RATE = bankDetails.usdtRate ; 
//   const depositAmountUSD = Number(amountGBP); 
//   const feePerUSDT = bankDetails.feePerUSDT || 0; 
//   console.log(NGN_RATE)

//   // Calculate fees and final received amount (in USD/USDT equivalent)
  
//   const feeUSD = (depositAmountUSD * (feePerUSDT / 100));
//   const amountToReceive = (depositAmountUSD - feeUSD);


  
//   // Calculate NGN equivalent for display
//   const amountToReceiveNGN = (amountToReceive * NGN_RATE).toLocaleString('en-US', { maximumFractionDigits: 0 });

//   // Handler for submitting the bank deposit
//   const handleSubmission = () => {
//     if (!bankDetails || !depositAmountUSD || depositAmountUSD <= 0) {
//       console.error("Missing required bank details or deposit amount.");
//       return;
//     }

//     const payload = {
//       amount: depositAmountUSD, // amount (in USD/USDT)
//       bankName: bankDetails.bankName,
//       accountNumber: bankDetails.accountNumber,
//       accountHolderName: bankDetails.accountHolderName,
//       feePerUSDT: feePerUSDT, // feePerUSDT (the percentage value)
//       amountToReceive: amountToReceive, // AmountToReceive (in USD/USDT equivalent)
//     };
//     console.log("amountToReceive", amountToReceive)

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
//           <XIcon className="size-6" />
//         </button>

//         {/* Header */}
//         <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
//           Confirm Bank Deposit
//         </h2>
//         <p className="text-sm text-center text-gray-600 mb-6">
//           Please transfer **${depositAmountUSD.toFixed(2)} USD** to the account details below.
//         </p>

//         {/* Summary */}
//         <h3 className="mt-4 mb-2 font-semibold text-gray-800">TRANSFER DETAILS</h3>
//         <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Account Name</span>
//             <span className="font-semibold text-gray-800">{bankDetails.accountHolderName || 'N/A'}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Bank Name</span>
//             <span className="font-semibold text-gray-800">{bankDetails.bankName || 'N/A'}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Account No.</span>
//             <span className="font-semibold text-gray-800">{bankDetails.accountNumber || 'N/A'}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-700">Fee per USDT</span>
//             <span className="font-semibold text-red-600">{feePerUSDT}%</span>
//           </div>
//         </div>

//         {/* Total */}
//         <div className="mt-4 border-t pt-3">
//             <h3 className="mb-1 font-semibold text-gray-800">Conversion Summary</h3>
//             <div className="flex justify-between text-sm text-gray-600">
//                 <span>Total Amount Deposited</span>
//                 <span>${depositAmountUSD.toFixed(2)} USD</span>
//             </div>
//             <div className="flex justify-between text-sm text-gray-600">
//                 <span>Fee Deducted ({feePerUSDT}%)</span>
//                 <span>-${feeUSD.toFixed(2)} USD</span>
//             </div>
//             <div className="flex justify-between items-center mt-3 pt-2 border-t font-bold text-lg text-gray-800">
//                 <span>You will Receive</span>
//                 <div className="text-right">
//                     <p className="text-green-600">${amountToReceive.toFixed(2)}</p>
//                     <p className="text-xs text-gray-500">~ NGN {amountToReceiveNGN}</p>
//                 </div>
//             </div>
//             <p className="text-xs text-gray-500 text-right mt-1">Rate: $1 = NGN {NGN_RATE}</p>
//         </div>


//         {/* Slide Button */}
//         <div className="mt-6">
//           <button 
//             onClick={handleSubmission}
//             disabled={isSubmitting}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? 'Submitting...' : 'I have completed the transfer →'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  usdtRate: number;
  feePerUSDT?: number;
}

interface DepositPayload {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  feePerUSDT: number;
  amountToReceive: number;
}

interface BankPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amountGBP: number; // USD amount (despite prop name)
  bankDetails?: BankDetails | null;
  onSubmitDeposit: (payload: DepositPayload) => void;
  isSubmitting: boolean;
}

 const BankPaymentModal: React.FC<BankPaymentModalProps> = ({
  isOpen,
  onClose,
  amountGBP,
  bankDetails,
  onSubmitDeposit,
  isSubmitting,
}) => {
  if (!isOpen || !bankDetails) return null;

  // Constants and Calculations (assuming amountGBP is the deposit amount in USD)
  const NGN_RATE: number = bankDetails.usdtRate;
  const depositAmountUSD: number = Number(amountGBP);
  const feePerUSDT: number = bankDetails.feePerUSDT || 0;

  // Calculate fees and final received amount
  const feeUSD: number = depositAmountUSD * (feePerUSDT / 100);
  const amountToReceive: number = depositAmountUSD - feeUSD;

  // Calculate NGN equivalent
  const amountToReceiveNGN: string = (amountToReceive * NGN_RATE).toLocaleString(
    "en-US",
    { maximumFractionDigits: 0 }
  );

  // Handler for submitting the bank deposit
  const handleSubmission = (): void => {
    if (!bankDetails || !depositAmountUSD || depositAmountUSD <= 0) {
      console.error("Missing required bank details or deposit amount.");
      return;
    }

    const payload: DepositPayload = {
      amount: depositAmountUSD,
      bankName: bankDetails.bankName,
      accountNumber: bankDetails.accountNumber,
      accountHolderName: bankDetails.accountHolderName,
      feePerUSDT: feePerUSDT,
      amountToReceive: amountToReceive,
    };

    console.log("amountToReceive", amountToReceive);
    onSubmitDeposit(payload);
  };

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 md:inset-0 md:items-center md:justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors duration-200"
        >
          <XIcon className="size-6" />
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold text-center text-gray-800 mb-4">
          Confirm Bank Deposit
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Please transfer<strong>~ NGN {amountToReceiveNGN} </strong> or <strong>${depositAmountUSD.toFixed(2)} USD</strong>  to
          the account details below.
        </p>

        {/* Summary */}
        <h3 className="mt-4 mb-2 font-semibold text-gray-800">
          TRANSFER DETAILS
        </h3>
        <div className="space-y-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Account Name</span>
            <span className="font-semibold text-gray-800">
              {bankDetails.accountHolderName || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Bank Name</span>
            <span className="font-semibold text-gray-800">
              {bankDetails.bankName || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Account No.</span>
            <span className="font-semibold text-gray-800">
              {bankDetails.accountNumber || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Fee per USDT</span>
            <span className="font-semibold text-red-600">{feePerUSDT}%</span>
          </div>
        </div>

        {/* Total */}
        <div className="mt-4 border-t pt-3">
          <h3 className="mb-1 font-semibold text-gray-800">
            Conversion Summary
          </h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Amount Deposited</span>
            <span>${depositAmountUSD.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Fee Deducted ({feePerUSDT}%)</span>
            <span>-${feeUSD.toFixed(2)} USD</span>
          </div>
          <div className="flex justify-between items-center mt-3 pt-2 border-t font-bold text-lg text-gray-800">
            <span>You will Receive</span>
            <div className="text-right">
              <p className="text-green-600">${amountToReceive.toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                ~ NGN {amountToReceiveNGN}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right mt-1">
            Rate: $1 = NGN {NGN_RATE}
          </p>
        </div>

        {/* Slide Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmission}
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "I have completed the transfer →"}
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Withdrawal Modals (NEW) ---


















/* =======================
   BANK WITHDRAWAL MODAL
======================= */
// const BankWithdrawalModal = ({ isOpen, onClose, withdrawalAmount }) => {
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [accountHolderName, setAccountHolderName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [feePerUSDT, setFeePerUSDT] = useState(0);
//   const [amountToReceive, setAmountToReceive] = useState(0);
//   const [userId, setUserId] = useState(null);

//   // Fetch conversion details from backend
//   useEffect(() => {
//     const fetchBankDetails = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first`);
//         if (res.data?.bankDetails) {
//           const fee = res.data.bankDetails.feePerUSDT || 0;
//           setFeePerUSDT(fee);
//           setAmountToReceive(withdrawalAmount - withdrawalAmount * (fee/100));
//         }
//       } catch (err) {
//         console.error("Error fetching bank details", err);
//       }
//     };
//     if (isOpen) fetchBankDetails();
//   }, [isOpen, withdrawalAmount]);

//   useEffect(() => {
//   const fetchUserId = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
//         headers: { "x-auth-token": token },
//       });
//       setUserId(res.data._id); // ✅ save logged-in user id
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//     }
//   };
//   if (isOpen) fetchUserId(); // only fetch when modal opens
// }, [isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!bankName || !accountNumber || !accountHolderName ) {
//       console.error("Please fill all bank details.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/withdraw/bank`, {
//         amount: withdrawalAmount,
//         bankName,
//         accountNumber,
//         accountHolderName,
//         amountToReceive, // ✅ lowercase matches backend
//         feePerUSDT,      // ✅ lowercase matches backend
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
//         {/* Amount (Auto-filled) */}
//         <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">Amount to Withdraw:</p>
//           <p className="font-bold text-lg text-red-600 dark:text-red-400">
//             ${Number(withdrawalAmount).toFixed(2)}
//           </p>
//         </div>

//         {/* Transaction Summary */}
//         <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">Fee per USDT: {feePerUSDT}</p>
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
//             type="number"
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

interface BankWithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  withdrawalAmount: number;
  onSubmitWithdrawal: (payload: WithdrawalPayload, stopLoading: () => void) => void; 
  
}

 const BankWithdrawalModal: React.FC<BankWithdrawalModalProps> = ({
  isOpen,
  onClose,
  withdrawalAmount,
}) => {
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountHolderName, setAccountHolderName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feePerUSDT, setFeePerUSDT] = useState<number>(0);
  const [amountToReceive, setAmountToReceive] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch conversion details from backend
  useEffect(() => {
    const fetchBankDetails = async (): Promise<void> => {
      try {
        const res = await axios.get<{ bankDetails?: { feePerUSDT?: number } }>(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first`
        );
        if (res.data?.bankDetails) {
          const fee = res.data.bankDetails.feePerUSDT || 0;
          setFeePerUSDT(fee);
          setAmountToReceive(
            withdrawalAmount - withdrawalAmount * (fee / 100)
          );
        }
      } catch (err) {
        console.error("Error fetching bank details", err);
      }
    };
    if (isOpen) fetchBankDetails();
  }, [isOpen, withdrawalAmount]);

  // Fetch userId
  useEffect(() => {
    const fetchUserId = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<{ _id: string }>(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`,
          {
            headers: { "x-auth-token": token || "" },
          }
        );
        setUserId(res.data._id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    if (isOpen) fetchUserId();
  }, [isOpen]);

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!bankName || !accountNumber || !accountHolderName) {
      console.error("Please fill all bank details.");
      return;
    }

    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/withdraw/bank`, {
        amount: withdrawalAmount,
        bankName,
        accountNumber,
        accountHolderName,
        amountToReceive,
        feePerUSDT,
      });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Error submitting bank withdrawal:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer to Bank Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Amount (Auto-filled) */}
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Amount to Withdraw:
          </p>
          <p className="font-bold text-lg text-red-600 dark:text-red-400">
            ${Number(withdrawalAmount).toFixed(2)}
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Fee per USDT: {feePerUSDT}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Amount to Receive: ${amountToReceive.toFixed(2)}
          </p>
        </div>

        {/* Bank Name */}
        <div>
          <label className="block text-sm mb-1">Bank Name</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm mb-1">Account Number</label>
          <input
            type="number"
            className="w-full rounded-lg border px-3 py-2"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>

        {/* Account Holder's Name */}
        <div>
          <label className="block text-sm mb-1">Account Holder's Name</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700 w-full py-3 rounded-xl mt-6"
        >
          {isSubmitting ? "Processing..." : "Confirm Bank Transfer"}
        </Button>
      </form>
    </Modal>
  );
};

/* ==========================
   CRYPTO WITHDRAWAL MODAL
========================== */
// const CryptoWithdrawalModal = ({ isOpen, onClose, withdrawalAmount }) => {
//   const [coinType, setCoinType] = useState("");
//   const [walletAddress, setWalletAddress] = useState("");
//   const [network, setNetwork] = useState("");
//   const [amountToReceive, setAmountToReceive] = useState(0);
//   const [feePerUSDT, setFeePerUSDT] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [userId, setUserId] = useState(null);

//   // Fetch conversion fee details
//   useEffect(() => {
//     const fetchCryptoDetails = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first`);
//         console.log(res.data.bankDetails.feePerUSDT)
//         if (res.data?.bankDetails) {
//           const fee = res.data.bankDetails.feePerUSDT;
//           console.log("fee, ", fee)
//           setFeePerUSDT(fee);
//           setAmountToReceive(withdrawalAmount - withdrawalAmount * (fee/100));
//         }
//       } catch (err) {
//         console.error("Error fetching crypto details", err);
//       }
//     };
//     if (isOpen) fetchCryptoDetails();
//   }, [isOpen, withdrawalAmount]);

  
//   useEffect(() => {
//   const fetchUserId = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
//         headers: { "x-auth-token": token },
//       });
//       setUserId(res.data._id); // ✅ save logged-in user id
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//     }
//   };
//   if (isOpen) fetchUserId(); // only fetch when modal opens
// }, [isOpen]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!coinType || !walletAddress || !network) {
//       console.error("Please fill all crypto details.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/withdraw/crypto`, {
//         amount: withdrawalAmount,
//         coinType,
//         amountToReceive,   // ✅ lowercase (fix)
//         cryptoAddress: walletAddress,
//         transactionHash: network,
//         feePerUSDT,        // ✅ include fee
//       });
//       console.log(amountToReceive)
//       console.log(withdrawalAmount)
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
//         {/* Amount (Auto-filled) */}
//         <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">Amount to Withdraw:</p>
//           <p className="font-bold text-lg text-green-600 dark:text-green-400">
//             ${Number(withdrawalAmount).toFixed(2)}
//           </p>
//         </div>

//         {/* Transaction Summary */}
//         <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
//           <p className="text-sm text-gray-600 dark:text-gray-300">Fee per USDT: {feePerUSDT}</p>
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
interface WithdrawalPayload {
  amount: number;
  method: "bank" | "crypto"; // example, adjust to your use case
  bankName?: string;
  accountNumber?: string;
  accountHolderName?: string;
  coinType?: string;
  walletAddress?: string;
  network?: string;
}
interface CryptoWithdrawalModalProps {

  isOpen: boolean;
  onClose: () => void;
  withdrawalAmount: number;
  onSubmitWithdrawal: (payload: WithdrawalPayload, stopLoading: () => void) => void; 
}

 const CryptoWithdrawalModal: React.FC<CryptoWithdrawalModalProps> = ({
  isOpen,
  onClose,
  withdrawalAmount,
  
}) => {
  const [coinType, setCoinType] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [amountToReceive, setAmountToReceive] = useState<number>(0);
  const [feePerUSDT, setFeePerUSDT] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch conversion fee details
  useEffect(() => {
    const fetchCryptoDetails = async (): Promise<void> => {
      try {
        const res = await axios.get<{ bankDetails?: { feePerUSDT: number } }>(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first`
        );
        if (res.data?.bankDetails) {
          const fee = res.data.bankDetails.feePerUSDT;
          setFeePerUSDT(fee);
          setAmountToReceive(
            withdrawalAmount - withdrawalAmount * (fee / 100)
          );
        }
      } catch (err) {
        console.error("Error fetching crypto details", err);
      }
    };
    if (isOpen) fetchCryptoDetails();
  }, [isOpen, withdrawalAmount]);

  // Fetch userId
  useEffect(() => {
    const fetchUserId = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<{ _id: string }>(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`,
          {
            headers: { "x-auth-token": token || "" },
          }
        );
        setUserId(res.data._id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
    if (isOpen) fetchUserId();
  }, [isOpen]);

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!coinType || !walletAddress || !network) {
      console.error("Please fill all crypto details.");
      return;
    }

    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/withdraw/crypto`, {
        amount: withdrawalAmount,
        coinType,
        amountToReceive,
        cryptoAddress: walletAddress,
        transactionHash: network,
        feePerUSDT,
      });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Error submitting crypto withdrawal:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Crypto">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Amount (Auto-filled) */}
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Amount to Withdraw:
          </p>
          <p className="font-bold text-lg text-green-600 dark:text-green-400">
            ${Number(withdrawalAmount).toFixed(2)}
          </p>
        </div>

        {/* Transaction Summary */}
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Fee per USDT: {feePerUSDT}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Amount to Receive: ${amountToReceive.toFixed(2)}
          </p>
        </div>

        {/* Coin Type */}
        <div>
          <label className="block text-sm mb-1">Coin Type</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            value={coinType}
            onChange={(e) => setCoinType(e.target.value)}
            required
          />
        </div>

        {/* Wallet Address */}
        <div>
          <label className="block text-sm mb-1">Wallet Address</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </div>

        {/* Network */}
        <div>
          <label className="block text-sm mb-1">Network</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 w-full py-3 rounded-xl mt-6"
        >
          {isSubmitting ? "Processing..." : "Confirm Crypto Withdrawal"}
        </Button>
      </form>
    </Modal>
  );
};


// --- Main Component ---
export default function EcommerceMetrics() {
  // State for deposits
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // Crypto Deposit Checkout
  const [isBankCheckoutOpen, setIsBankCheckoutOpen] = useState(false); // Bank Deposit Checkout
  const [depositMethod, setDepositMethod] = useState("bank"); // Deposit method: 'bank' or 'crypto'
  
  // State for withdrawals (transfers)
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false); // Initial transfer selection modal
  const [isBankWithdrawalModalOpen, setIsBankWithdrawalModalOpen] = useState(false); // Bank withdrawal details modal
  const [isCryptoWithdrawalModalOpen, setIsCryptoWithdrawalModalOpen] = useState(false); // Crypto withdrawal details modal
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank'); // Withdrawal method: 'bank' or 'usdt'

  // Common transaction amount state (used for both deposit and withdrawal)
  const [transactionAmount, setTransactionAmount] = useState("");
  
  // Profile/Balance states
  const [amount, setAmount] = useState(0); // Available Balance (Used for withdrawal validation)
  const [payout, setPayout] = useState(0);
  const [loading, setLoading] = useState(true);

  // Coin and Backend Details
  const [coinType, setCoinType] = useState("USDT"); // Coin type for deposits (dynamically set in Fund modal)
  // const [coinTypes, setCoinTypes] = useState([]);
  const [coinTypes, setCoinTypes] = useState<string[]>([]);

  const [coinData, setCoinData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [adminBankDetails, setAdminBankDetails] = useState(null);
  const [isBankLoading, setIsBankLoading] = useState(false); // For bank deposit loading
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false); // For bank deposit submission


  // Reusable profile fetch
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // NOTE: Using localhost:8000 for API calls as per original code
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();

      setAmount(data.amount || 0); // Available Balance
      setPayout(data.payout || 0);
      setUserId(data._id);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch Admin Bank Details for DEPOSIT
  // const fetchAdminBankDetails = async () => {
  //   if (adminBankDetails && !isBankLoading) return true; 

  //   setIsBankLoading(true);
  //   try {
  //       const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first`, {
  //           headers: { "Content-Type": "application/json" },
  //       });

  //       if (!res.ok) throw new Error("Failed to fetch admin bank details");

  //       const data = await res.json();
  //       setAdminBankDetails(data.bankDetails); 
  //       return true;
  //   } catch (err) {
  //       console.error("Error fetching admin bank details:", err.message);
  //       // IMPORTANT: Replace alert with a custom modal UI in a real app
  //       console.error("Failed to load bank details for deposit. Please try again.");
  //       return false;
  //   } finally {
  //       setIsBankLoading(false);
  //   }
  // };
  const fetchAdminBankDetails = async (): Promise<boolean> => {
  if (adminBankDetails && !isBankLoading) return true;

  setIsBankLoading(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to fetch admin bank details");

    const data = await res.json();
    setAdminBankDetails(data.bankDetails);
    return true;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching admin bank details:", err.message);
    } else {
      console.error("Unexpected error:", err);
    }

    // IMPORTANT: Replace alert with a custom modal UI in a real app
    console.error("Failed to load bank details for deposit. Please try again.");
    return false;
  } finally {
    setIsBankLoading(false);
  }
};


  /**
   * Submits the bank deposit transaction to the backend.
   */
  // const handleSubmitBankDeposit = async (payload) => {
  //   if (!userId) {
  //       // IMPORTANT: Replace alert with a custom modal UI in a real app
  //       console.error("User session error. Please log in again.");
  //       return;
  //   }
    
  //   setIsSubmittingDeposit(true);
    
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) throw new Error("No token found. Please log in.");

  //     const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/bankdeposit`;

  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-auth-token": token,
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!res.ok) {
  //       let errorMessage = "Failed to submit bank deposit.";
  //       try {
  //           const errorData = await res.json();
  //           errorMessage = errorData.error || errorMessage;
  //       } catch {}
  //       throw new Error(errorMessage);
  //     }

  //     const data = await res.json();
  //     console.log("Bank Deposit submitted:", data);
      
  //     // IMPORTANT: Replace alert with a custom modal UI in a real app
  //     console.log("Bank deposit request submitted successfully! Status: pending review.");
      
  //     setIsBankCheckoutOpen(false); // Close modal on success
  //     setTransactionAmount(""); // Clear amount
  //     await fetchProfile(); // Refresh profile data
      
  //   } catch (error) {
  //     console.error("Error submitting bank deposit:", error.message);
  //     // IMPORTANT: Replace alert with a custom modal UI in a real app
  //     console.error(`Error submitting bank deposit: ${error.message}`);
  //   } finally {
  //     setIsSubmittingDeposit(false);
  //   }
  // };

  // ✅ Define the payload type
interface BankDepositPayload {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  feePerUSDT: number;
  amountToReceive: number;
}

const handleSubmitBankDeposit = async (payload: BankDepositPayload): Promise<void> => {
  if (!userId) {
    // IMPORTANT: Replace alert with a custom modal UI in a real app
    console.error("User session error. Please log in again.");
    return;
  }

  setIsSubmittingDeposit(true);

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const url = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/${userId}/bankdeposit`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorMessage = "Failed to submit bank deposit.";
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // ignore JSON parsing errors
      }
      throw new Error(errorMessage);
    }

    const data = await res.json();
    console.log("Bank Deposit submitted:", data);

    // IMPORTANT: Replace alert with a custom modal UI in a real app
    console.log("Bank deposit request submitted successfully! Status: pending review.");

    setIsBankCheckoutOpen(false); // Close modal on success
    setTransactionAmount(""); // Clear amount
    await fetchProfile(); // Refresh profile data

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error submitting bank deposit:", error.message);
      console.error(`Error submitting bank deposit: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
    }
  } finally {
    setIsSubmittingDeposit(false);
  }
};

  /**
   * Universal withdrawal handler (Simulated)
   * This is called by the new withdrawal modals (BankWithdrawalModal, CryptoWithdrawalModal).
   */
  // const handleWithdrawalSubmission = (payload, stopLoading) => {
  //   console.log("Submitting Withdrawal:", payload);
    
  //   // Simulate API call success/failure
  //   setTimeout(() => {
  //       // Here you would call your backend endpoint (e.g., /api/${userId}/withdrawal)
  //       if (Math.random() > 0.1) { // 90% success rate simulation
  //           console.log("Withdrawal request successful!", payload);
  //           // IMPORTANT: Replace alert with a custom modal UI in a real app
  //           console.log("Withdrawal submitted for review. Funds will arrive shortly.");
            
  //           // Assuming successful submission clears the form and closes all withdrawal modals
  //           setIsBankWithdrawalModalOpen(false);
  //           setIsCryptoWithdrawalModalOpen(false);
  //           setIsTransferModalOpen(false);
  //           setTransactionAmount("");
  //           fetchProfile(); // Refresh balance
  //       } else {
  //           console.error("Withdrawal failed due to processing error.");
  //           // IMPORTANT: Replace alert with a custom modal UI in a real app
  //           console.error("Withdrawal failed. Please try again.");
  //       }
  //       stopLoading(); // Callback to reset button state in the modal
  //   }, 1500);
  // };


  
  // ✅ Define payload shape (customize fields as needed)
// interface WithdrawalPayload {
//   amount: number;
//   method: "bank" | "crypto"; // example, adjust to your use case
//   bankName?: string;
//   accountNumber?: string;
//   accountHolderName?: string;
//   coinType?: string;
//   walletAddress?: string;
//   network?: string;
// }

const handleWithdrawalSubmission = (
  payload: WithdrawalPayload,
  stopLoading: () => void
): void => {
  console.log("Submitting Withdrawal:", payload);

  // Simulate API call success/failure
  setTimeout(() => {
    // Here you would call your backend endpoint (e.g., /api/${userId}/withdrawal)
    if (Math.random() > 0.1) {
      // ✅ 90% success simulation
      console.log("Withdrawal request successful!", payload);
      console.log("Withdrawal submitted for review. Funds will arrive shortly.");

      // Reset state
      setIsBankWithdrawalModalOpen(false);
      setIsCryptoWithdrawalModalOpen(false);
      setIsTransferModalOpen(false);
      setTransactionAmount("");
      fetchProfile(); // Refresh balance
    } else {
      console.error("Withdrawal failed due to processing error.");
      console.error("Withdrawal failed. Please try again.");
    }
    stopLoading(); // ✅ typed callback to reset button state
  }, 1500);
};

  // Handle Deposit Now click logic (from Fund Account Modal)
const handleDepositNow = async () => {
    setIsFundModalOpen(false); // Close fund modal

    if (depositMethod === "bank") {
        const success = await fetchAdminBankDetails();
        if (success) {
          setIsBankCheckoutOpen(true);
        }
    } else {
        setIsCheckoutOpen(true);
    }
};
  
  // Handle Transfer Now click logic (from Transfer Funds Modal)
const handleTransferNow = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form default submission

    const amountToWithdraw = Number(transactionAmount);
    const currentBalance = Number(amount); // 'amount' is the available balance state

    if (amountToWithdraw <= 0 || isNaN(amountToWithdraw)) {
        // IMPORTANT: Use a custom UI for errors
        console.error("Please enter a valid withdrawal amount.");
        return;
    }

    // Check if amount is greater than available balance
    if (amountToWithdraw > currentBalance) {
        // IMPORTANT: Use a custom UI for errors
        console.error(`Withdrawal amount ($${amountToWithdraw.toFixed(2)}) exceeds available balance ($${currentBalance.toFixed(2)}).`);
        return;
    }
    
    // Close the initial selection modal
    setIsTransferModalOpen(false);

    // Open the specific withdrawal modal
    if (withdrawalMethod === 'bank') {
        setIsBankWithdrawalModalOpen(true);
    } else if (withdrawalMethod === 'usdt') {
        setIsCryptoWithdrawalModalOpen(true);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch coin types
  useEffect(() => {
    const fetchCoinTypes = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { "x-auth-token": token } : {}), // ✅ only add if not null
        };
        
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/images/coin-types`, { headers });

        // const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/images/coin-types`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "x-auth-token": localStorage.getItem("token"),
        //   },
        // });

        if (!res.ok) throw new Error("Failed to fetch coin types");

        const data = await res.json();
        setCoinTypes(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching coin types:", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
      }

    };

    fetchCoinTypes();
  }, []);

  // Fetch coin data when coinType changes (only relevant for crypto deposit)
  useEffect(() => {
    if (!coinType || depositMethod !== "crypto") return;

    const fetchCoinData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...(token ? { "x-auth-token": token } : {}), // ✅ only add if not null
        };

        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/images/by-coin/${coinType}`, { headers });

        // const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/images/by-coin/${coinType}`, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     "x-auth-token": localStorage.getItem("token"),
        //   },
        // });

        if (!res.ok) throw new Error("Failed to fetch coin data");
        const data = await res.json();
        setCoinData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching coin types:", err.message);
        } else {
          console.error("Unexpected error:", err);
        }
      }

    };

    fetchCoinData();
  }, [coinType, depositMethod]);


  return (
    <>
    
      <div className=" bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 font-sans">
        <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Wallet Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your funds and transactions securely.</p>
        </header>
        
        {/* Balance + Payout cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {/* Balance */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800 shadow-lg md:p-6">
            <h4 className="text-gray-500 dark:text-gray-400 text-sm">Available Balance (USD)</h4>
            <div className="flex justify-between items-center mt-3">
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {loading ? "Loading..." : `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <Badge color="success" onClick={() => {
                  setIsFundModalOpen(true); 
                  setTransactionAmount(""); // Reset amount for new transaction
                  setDepositMethod("bank"); // Default to bank for deposit
                }}>
                <ArrowDownIcon className="size-4" />
                Fund Account
              </Badge>
            </div>
          </div>

          {/* Payout */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-800 shadow-lg md:p-6">
            <h4 className="text-gray-500 dark:text-gray-400 text-sm">Total Payout (USD)</h4>
            <div className="flex justify-between items-center mt-3">
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {loading ? "Loading..." : `$${Number(payout).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
              <Badge color="error" onClick={() => {
                  setIsTransferModalOpen(true);
                  setTransactionAmount(""); // Reset amount for new transaction
                  setWithdrawalMethod("bank"); // Default to bank for withdrawal
              }}>
                <ArrowUpIcon className="size-4" />
                Transfer Funds
              </Badge>
            </div>
          </div>
        </div>

      </div>
    
      {/* --- MODALS --- */}

      {/* 1. Fund Account Modal (Initial Deposit Selection) */}
      <Modal isOpen={isFundModalOpen} onClose={() => setIsFundModalOpen(false)} title="Fund Account">
        <form className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              I want to deposit
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="0"
                min="1"
                step="0.01"
                className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                required
              />
              {/* <span className="px-3 py-2 text-gray-600 dark:text-gray-400 font-medium">USD</span> */}
            </div>
          </div>

          {/* Deposit Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deposit Method
            </label>
            <select
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              value={depositMethod}
              onChange={(e) => setDepositMethod(e.target.value)}
            >
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Crypto</option>
            </select>
          </div>
          
          {/* Coin Type Selector (Only visible for crypto deposit) */}
          {depositMethod === "crypto" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Coin Type
              </label>
              <select
                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                value={coinType}
                onChange={(e) => setCoinType(e.target.value)}
              >
                <option value="">{loading ? "Loading..." : "Select Coin"}</option>
                {/* Dynamically loads coin types from the backend response */}
                {coinTypes.map((type, index) => (
                  <option key={index} value={type.toUpperCase()}>
                    {type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Deposit Button */}
          <Button
            type="button"
            disabled={!transactionAmount || Number(transactionAmount) <= 0 || (depositMethod === 'bank' && isBankLoading)} 
            onClick={handleDepositNow}
            className="bg-green-600 hover:bg-green-700 w-full text-md py-3 rounded-xl shadow-md"
          >
            {depositMethod === 'bank' && isBankLoading ? 'Loading Bank Details...' : 'Deposit Now'}
          </Button>
        </form>
      </Modal>

      {/* 2. Transfer Funds Modal (Initial Withdrawal Selection) */}
      <Modal 
        isOpen={isTransferModalOpen} 
        onClose={() => setIsTransferModalOpen(false)} 
        title="Transfer Funds"
      >
        <form className="space-y-6" onSubmit={handleTransferNow}>
          
          {/* Withdrawal Method Select Field */}
          <div>
            <label htmlFor="withdrawal-method" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Withdrawal Method
            </label>
            <select
              id="withdrawal-method"
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 appearance-none transition duration-150 ease-in-out"
              value={withdrawalMethod}
              onChange={(e) => setWithdrawalMethod(e.target.value)}
              required
            >
              <option value="bank">Withdraw to bank</option>
              <option value="usdt">Withdraw to crypto (USDT)</option>
            </select>
          </div>
          
          {/* Amount Input Field (Withdrawal Amount) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount to transfer (Max: ${Number(amount).toFixed(2)})
            </label>
            <input
              type="number"
              placeholder="0.00"
              min="1"
              step="0.01"
              className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-150 ease-in-out"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
             {Number(transactionAmount) > Number(amount) && (
                <p className="text-xs text-red-500 mt-1">Amount exceeds available balance.</p>
            )}
          </div>
          
          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={!transactionAmount || Number(transactionAmount) <= 0 || Number(transactionAmount) > Number(amount)} 
            className="bg-red-600 hover:bg-red-700 w-full text-md py-3 rounded-xl shadow-md"
          >
            Transfer Now
          </Button>
        </form>
      </Modal>

      {/* 3. Crypto Deposit Checkout Modal (Existing) */}

      <PaymentModal
  isOpen={isCheckoutOpen}
  onClose={() => setIsCheckoutOpen(false)}
  amountGBP={Number(transactionAmount)} // ✅ convert string → number
  coinData={coinData || undefined}      // ✅ avoid null type error
  userId={userId ?? ""}                 // ✅ ensure string
  coinType={coinType}
  fetchProfile={fetchProfile}
/>

<BankPaymentModal
  isOpen={isBankCheckoutOpen}
  onClose={() => setIsBankCheckoutOpen(false)}
  amountGBP={Number(transactionAmount)} // ✅ convert string → number
  bankDetails={adminBankDetails}
  onSubmitDeposit={handleSubmitBankDeposit}
  isSubmitting={isSubmittingDeposit}
/>

<BankWithdrawalModal
  isOpen={isBankWithdrawalModalOpen}
  onClose={() => setIsBankWithdrawalModalOpen(false)}
  withdrawalAmount={Number(transactionAmount)} // ✅ ensure number
  onSubmitWithdrawal={handleWithdrawalSubmission}
/>

<CryptoWithdrawalModal
  isOpen={isCryptoWithdrawalModalOpen}
  onClose={() => setIsCryptoWithdrawalModalOpen(false)}
  withdrawalAmount={Number(transactionAmount)} // ✅ ensure number
  onSubmitWithdrawal={handleWithdrawalSubmission}
/>


      {/* <PaymentModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        amountGBP={transactionAmount}
        coinData={coinData}
        userId={userId}
        coinType={coinType}
        fetchProfile={fetchProfile}
      />

      * 4. Bank Deposit Checkout Modal (Existing) 
      <BankPaymentModal
        isOpen={isBankCheckoutOpen}
        onClose={() => setIsBankCheckoutOpen(false)}
        amountGBP={transactionAmount}
        bankDetails={adminBankDetails}
        onSubmitDeposit={handleSubmitBankDeposit}
        isSubmitting={isSubmittingDeposit}
      />

      /* 5. NEW: Bank Withdrawal Details Modal 
      <BankWithdrawalModal
        isOpen={isBankWithdrawalModalOpen}
        onClose={() => setIsBankWithdrawalModalOpen(false)}
        withdrawalAmount={transactionAmount}
        onSubmitWithdrawal={handleWithdrawalSubmission}
      />

      /* 6. NEW: Crypto Withdrawal Details Modal 
      <CryptoWithdrawalModal
        isOpen={isCryptoWithdrawalModalOpen}
        onClose={() => setIsCryptoWithdrawalModalOpen(false)}
        withdrawalAmount={transactionAmount}
        onSubmitWithdrawal={handleWithdrawalSubmission}
      /> */}
    </>
  );
}