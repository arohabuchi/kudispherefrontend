import { useEffect, useState } from "react";

interface BankDetails {
  bankDetails: {
    usdtRate: number;
    feePerUSDT: number;
  };
}

export default function MonthlySalesChart() {
  const [usdtRate, setUsdtRate] = useState<number | null>(null);
  const [feePerUSDT, setFeePerUSDT] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/admin/bank-details/first`);
        if (!res.ok) throw new Error("Failed to fetch bank details");
        const data: BankDetails = await res.json();
        setUsdtRate(data.bankDetails.usdtRate);
        setFeePerUSDT(data.bankDetails.feePerUSDT);
      } catch (error) {
        console.error("Error fetching bank details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  return (
    <div className="rounded-2xl  bg-gray-900/0 p-6 dark:border-gray-800 dark:bg-gray-900 h-[300px] w-full flex flex-col shadow-lg">
      <h3 className="text-xl font-semibold text-gray-500 mb-6">Conversion Rate</h3>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <ul className="space-y-4">
            {/* USDT Rate */}
            <li className="flex items-center gap-4 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white font-bold">
                $
              </div>
              <div>
                <p className="font-semibold text-white">1 USDT =</p>
                <span className="text-sm text-gray-400">
                  {usdtRate ? usdtRate.toLocaleString() : "N/A"} NGN
                </span>
              </div>
            </li>

            {/* Fee */}
            <li className="flex items-center gap-4 p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white font-bold">
                %
              </div>
              <div>
                <p className="font-semibold text-white">Transaction Fee</p>
                <span className="text-sm text-gray-400">
                  {feePerUSDT !== null ? `${feePerUSDT}%` : "N/A"}
                </span>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}















// import { ApexOptions } from "apexcharts";
// import Chart from "react-apexcharts";
// import { useState } from "react";
// import { Link } from "react-router-dom"; // Assuming you're using react-router-dom



// export default function MonthlySalesChart() {


//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6 h-[300px] w-full flex flex-col">
//       <h3 className="text-xl font-semibold text-white mb-4"> Conversion Rate</h3>
//       <div className="flex-1 overflow-y-auto custom-scrollbar">
//         <ul className="space-y-4">
//             <li className="p-4 rounded-xl cursor-pointer transition-colors duration-200 ">
//                 <div className="flex items-center gap-4">
                  
//                   <p className="w-10 h-10 rounded-full">Rate</p>
//                   <div className="">
//                     <p className="font-semibold text-white">1 USDT</p>
//                     <span className="text-sm text-gray-400">1900</span>
//                   </div>
//                 </div>
                
//             </li>
//             <li className="p-4 rounded-xl cursor-pointer transition-colors duration-200 ">
//                 <div className="flex items-center gap-4">
                  
//                   <p className="w-10 h-10 rounded-full">Fee</p>
//                   <div className="">
//                     <p className="font-semibold text-white">1 USDT</p>
//                     <span className="text-sm text-gray-400">2.5%</span>
//                   </div>
//                 </div>
                
//             </li>
//         </ul>
//       </div>
  




// </div>



// )}