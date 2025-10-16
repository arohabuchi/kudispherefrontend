"use client";

import React, { useState, useEffect, useMemo } from "react";

// ✅ Badge Component
const Badge = ({ variant, children }: { variant: string; children: React.ReactNode }) => {
  const colors: Record<string, string> = {
    success: "bg-green-100 text-green-700 border border-green-400",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    error: "bg-red-100 text-red-700 border border-red-400",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[variant] || "bg-gray-100 text-gray-700"}`}
    >
      {children}
    </span>
  );
};

// ✅ Table Components
const Table = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className="overflow-x-auto">
    <table className={`border-collapse ${className}`}>{children}</table>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="border-b bg-gray-50">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;

const TableRow = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <tr
    onClick={onClick}
    className={`border-b transition-colors ${onClick ? "cursor-pointer hover:bg-blue-50" : ""} ${className}`}
  >
    {children}
  </tr>
);

// ❌ FIX APPLIED HERE 
const TableCell = ({ children, className = "", colSpan }: { children: React.ReactNode; className?: string; colSpan?: number }) => (
  <td className={`px-4 py-3 text-sm ${className}`} colSpan={colSpan}>
    {children}
  </td>
);
// ❌ END FIX

// -------------------------------------------------------------------
// ✅ Pagination Controls Component 
// -------------------------------------------------------------------
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Logic to show a few page number buttons around the current page
  const pageNumbers = useMemo(() => {
    const range = [];
    const maxVisible = 5; 
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  const PageButton = ({ page, isActive, children }: { page: number, isActive: boolean, children: React.ReactNode }) => (
    <button
      onClick={() => onPageChange(page)}
      disabled={isActive}
      className={`px-3 py-1 text-sm rounded-lg transition-colors duration-150 ease-in-out ${
        isActive
          ? "bg-blue-600 text-white font-semibold"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <PageButton key={page} page={page} isActive={page === currentPage}>
          {page}
        </PageButton>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
// -------------------------------------------------------------------

// ✅ Popup Component
interface Transaction {
  _id: string;
  transactionType: string;
  status: string;
  createdAt: string;
  amount: number;
  bankDetails?: {
    amountToReceive?: number;
  };
  cryptoDetails?: {
    amountToReceive?: number;
    coinType?: string;
  };
}

interface TransactionDetailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const TransactionDetailPopup: React.FC<TransactionDetailPopupProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center  w-full justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[450px] animate-fadeIn">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Transaction Details</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Date:</span>
            <span>{new Date(transaction.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Type:</span>
            <span>{transaction.transactionType}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Amount:</span>
            <span className="font-semibold">${transaction.amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-400">Amount To Receive:</span>
            <span>
              {transaction.bankDetails?.amountToReceive ??
                transaction.cryptoDetails?.amountToReceive ??
                "N/A"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-white">Status:</span>
            <Badge
              variant={
                transaction.status === "completed"
                  ? "success"
                  : transaction.status === "pending"
                  ? "warning"
                  : "error"
              }
            >
              {transaction.status}
            </Badge>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Main Component
const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // -------------------------------------------------------------------
  // 💡 Pagination State
  // -------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // Fetch profile to get userId
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUserId(data._id);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userId) return;
      console.log("userid ", userId)
      try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/transaction/${userId}`, {
            headers: {
              "x-auth-token": localStorage.getItem("token") || "",
              "Content-Type": "application/json",
            },
          });

        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
        // Reset to first page when new data is fetched
        setCurrentPage(1); 
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTransaction(null);
  };

  // -------------------------------------------------------------------
  // 💡 Pagination Logic
  // -------------------------------------------------------------------
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction History</h2>
      
      <Table className="w-full border rounded-lg overflow-hidden shadow-sm">
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold">Date</TableCell>
            <TableCell className="font-bold">Amount To Receive</TableCell>
            <TableCell className="font-bold">Type</TableCell>
            <TableCell className="font-bold">Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTransactions.length > 0 ? ( 
            paginatedTransactions.map((txn) => (
              <TableRow key={txn._id} onClick={() => handleRowClick(txn)}>
                <TableCell>{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {txn.bankDetails?.amountToReceive ??
                    txn.cryptoDetails?.amountToReceive ??
                    "N/A"}
                </TableCell>
                <TableCell>{txn.transactionType}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      txn.status === "completed"
                        ? "success"
                        : txn.status === "pending"
                        ? "warning"
                        : "error"
                    }
                  >
                    {txn.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
             <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                {transactions.length === 0 && userId ? "No transactions found." : "Loading transactions..."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* 💡 Render Pagination Controls */}
      {transactions.length > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {isPopupOpen && selectedTransaction && (
        <TransactionDetailPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default TransactionTable;


// "use client";

// import React, { useState, useEffect } from "react";

// // ✅ Badge Component
// const Badge = ({ variant, children }: { variant: string; children: React.ReactNode }) => {
//   const colors: Record<string, string> = {
//     success: "bg-green-100 text-green-700 border border-green-400",
//     warning: "bg-yellow-100 text-yellow-700 border border-yellow-400",
//     error: "bg-red-100 text-red-700 border border-red-400",
//   };
//   return (
//     <span
//       className={`px-2 py-1 rounded-full text-xs font-medium ${colors[variant] || "bg-gray-100 text-gray-700"}`}
//     >
//       {children}
//     </span>
//   );
// };

// // ✅ Table Components
// const Table = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//     <div className="overflow-x-auto">
//   <table className={`border-collapse ${className}`}>{children}</table></div>
// );

// const TableHeader = ({ children }: { children: React.ReactNode }) => (
//   <thead className="border-b bg-gray-50">{children}</thead>
// );

// const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;

// const TableRow = ({
//   children,
//   className = "",
//   onClick,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
// }) => (
//   <tr
//     onClick={onClick}
//     className={`border-b transition-colors ${onClick ? "cursor-pointer hover:bg-blue-50" : ""} ${className}`}
//   >
//     {children}
//   </tr>
// );

// const TableCell = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <td className={`px-4 py-3 text-sm ${className}`}>{children}</td>
// );

// // ✅ Popup Component
// interface Transaction {
//   _id: string;
//   transactionType: string;
//   status: string;
//   createdAt: string;
//   amount: number;
//   bankDetails?: {
//     amountToReceive?: number;
//   };
//   cryptoDetails?: {
//     amountToReceive?: number;
//     coinType?: string;
//   };
// }

// interface TransactionDetailPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
//   transaction: Transaction | null;
// }

// const TransactionDetailPopup: React.FC<TransactionDetailPopupProps> = ({
//   isOpen,
//   onClose,
//   transaction,
// }) => {
//   if (!isOpen || !transaction) return null;

//   return (
//     <div className="fixed inset-0 flex items-center  w-full justify-center z-50 bg-black bg-opacity-40">
//       <div className="bg-white rounded-xl shadow-2xl p-6 w-[450px] animate-fadeIn">
//         <h3 className="text-xl font-semibold mb-4 text-gray-800">Transaction Details</h3>

//         <div className="space-y-3 text-sm">
//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Date:</span>
//             <span>{new Date(transaction.createdAt).toLocaleString()}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Type:</span>
//             <span>{transaction.transactionType}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-600">Amount:</span>
//             <span className="font-semibold">${transaction.amount}</span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-gray-400">Amount To Receive:</span>
//             <span>
//               {transaction.bankDetails?.amountToReceive ??
//                 transaction.cryptoDetails?.amountToReceive ??
//                 "N/A"}
//             </span>
//           </div>

//           <div className="flex justify-between">
//             <span className="font-medium text-white">Status:</span>
//             <Badge
//               variant={
//                 transaction.status === "completed"
//                   ? "success"
//                   : transaction.status === "pending"
//                   ? "warning"
//                   : "error"
//               }
//             >
//               {transaction.status}
//             </Badge>
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ Main Component
// const TransactionTable: React.FC = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);

//   // Fetch profile to get userId
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
//           headers: {
//             "x-auth-token": token,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch profile");
//         const data = await res.json();
//         setUserId(data._id);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Fetch transactions
//   useEffect(() => {
//     const fetchTransactions = async () => {
//       if (!userId) return;
//       console.log("userid ", userId)
//       try {
//         const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/transaction/${userId}`, {
//             headers: {
//               "x-auth-token": localStorage.getItem("token") || "",
//               "Content-Type": "application/json",
//             },
//           });

//         if (!res.ok) throw new Error("Failed to fetch transactions");
//         const data = await res.json();
//         setTransactions(data);
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchTransactions();
//   }, [userId]);

//   const handleRowClick = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setSelectedTransaction(null);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Transaction History</h2>
//       <Table className="w-full border rounded-lg overflow-hidden shadow-sm">
//         <TableHeader>
//           <TableRow>
//             <TableCell className="font-bold">Date</TableCell>
//             <TableCell className="font-bold">Amount To Receive</TableCell>
//             <TableCell className="font-bold">Type</TableCell>
//             <TableCell className="font-bold">Status</TableCell>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {transactions.map((txn) => (
//             <TableRow key={txn._id} onClick={() => handleRowClick(txn)}>
//               <TableCell>{new Date(txn.createdAt).toLocaleDateString()}</TableCell>
//               <TableCell>
//                 {txn.bankDetails?.amountToReceive ??
//                   txn.cryptoDetails?.amountToReceive ??
//                   "N/A"}
//               </TableCell>
//               <TableCell>{txn.transactionType}</TableCell>
//               <TableCell>
//                 <Badge
//                   variant={
//                     txn.status === "completed"
//                       ? "success"
//                       : txn.status === "pending"
//                       ? "warning"
//                       : "error"
//                   }
//                 >
//                   {txn.status}
//                 </Badge>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {isPopupOpen && selectedTransaction && (
//         <TransactionDetailPopup
//           isOpen={isPopupOpen}
//           onClose={closePopup}
//           transaction={selectedTransaction}
//         />
//       )}
//     </div>
//   );
// };

// export default TransactionTable;










