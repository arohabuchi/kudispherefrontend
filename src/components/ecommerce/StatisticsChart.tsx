import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// ----------------- Types -----------------
interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

// ----------------- Chart Options -----------------
const chartOptions: ApexOptions = {
  chart: {
    height: 350,
    type: "area",
    toolbar: { show: false },
  },
  colors: ["#6366F1", "#9CA3AF", "#465FFF", "#9CB9FF", "#34D399"],
  stroke: { curve: "smooth", width: 2 },
  dataLabels: { enabled: false },
  legend: { show: false },
  grid: { show: false },
  xaxis: {
    type: "category",
    categories: [
      "12 AM", "2 AM", "4 AM", "6 AM", "8 AM", "10 AM",
      "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "10 PM",
    ],
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
  },
  yaxis: { labels: { show: false } },
};

const chartSeries = [
  {
    name: "Bitcoin",
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 130],
  },
  {
    name: "Ethereum",
    data: [20, 30, 25, 40, 39, 50, 60, 81, 105, 80, 90, 110],
  },
  {
    name: "Ripple",
    data: [15, 20, 18, 25, 22, 30, 40, 50, 60, 55, 65, 75],
  },
];

// ----------------- Component -----------------
export default function LiveCryptoPricesCard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        const data = await res.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
    const interval = setInterval(fetchCrypto, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/0 p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6 h-[700px] w-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Live Crypto Prices</h3>
      </div>

      {/* Table and Chart Container */}
      <div className="flex flex-col xl:flex-row h-full">
        {/* Table Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 max-h-[300px] xl:max-h-full">
          {loading ? (
            <p className="text-gray-400">Loading prices...</p>
          ) : (
            <table className="w-full text-left text-gray-400">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-1 font-normal text-sm">Coin</th>
                  <th className="py-2 px-1 font-normal text-sm">Price (USD)</th>
                  <th className="py-2 px-1 font-normal text-sm">24h Change</th>
                  <th className="py-2 px-1 font-normal text-sm hidden sm:table-cell">
                    Market Cap
                  </th>
                  <th className="py-2 px-1 font-normal text-sm hidden sm:table-cell">
                    Volume (24h)
                  </th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((coin) => (
                  <tr key={coin.id} className="border-b border-gray-800">
                    <td className="py-3 px-1">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={`${coin.name} logo`}
                          className="w-7 h-7"
                        />
                        <span className="text-white text-sm">
                          {coin.name} ({coin.symbol.toUpperCase()})
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-1 text-sm">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`py-3 px-1 text-sm font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </td>
                    <td className="py-3 px-1 text-sm hidden sm:table-cell">
                      ${coin.market_cap.toLocaleString()}
                    </td>
                    <td className="py-3 px-1 text-sm hidden sm:table-cell">
                      ${coin.total_volume.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Chart Section */}
        
      </div>
    </div>
  );
}


















// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

// // Data for the crypto table
// const cryptoData = [
//   {
//     coin: "Bitcoin",
//     logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025",
//     price: "$93588",
//     change24h: { green: "00%", red: "27%" },
//     marketCap: "...", // Placeholder
//     marumetCap: "...", // Placeholder
//     volume24h: "...", // Placeholder
//   },
//   {
//     coin: "Bitcoin",
//     logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=025",
//     price: "$87896",
//     change24h: { green: "08%", red: "24%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Ethereum",
//     logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
//     price: "$53009",
//     change24h: { green: "70%", red: "22%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Ripple",
//     logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=025",
//     price: "$75009",
//     change24h: { green: "00%", red: "10%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Litecole",
//     logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=025",
//     price: "$50998",
//     change24h: { green: "70%", red: "28%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Cardano",
//     logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=025",
//     price: "$31196",
//     change24h: { green: "20%", red: "38%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Cardano",
//     logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=025",
//     price: "$20996",
//     change24h: { green: "10%", red: "20%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Solana",
//     logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=025",
//     price: "$25998",
//     change24h: { green: "30%", red: "20%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Dogecoin",
//     logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=025",
//     price: "$76606",
//     change24h: { green: "30%", red: "30%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
//   {
//     coin: "Dogecoin",
//     logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=025",
//     price: "$25999",
//     change24h: { green: "10%", red: "60%" },
//     marketCap: "...",
//     marumetCap: "...",
//     volume24h: "...",
//   },
// ];

// // Options and series for the main chart
// const chartOptions: ApexOptions = {
//   chart: {
//     height: 350,
//     type: "area",
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#6366F1", "#9CA3AF", "#465FFF", "#9CB9FF", "#34D399"], // Example colors
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   legend: {
//     show: false,
//   },
//   grid: {
//     show: false,
//   },
//   xaxis: {
//     type: "category",
//     categories: [
//       "12 AM",
//       "2 AM",
//       "4 AM",
//       "6 AM",
//       "8 AM",
//       "10 AM",
//       "12 PM",
//       "2 PM",
//       "4 PM",
//       "6 PM",
//       "8 PM",
//       "10 PM",
//     ],
//     labels: { show: false },
//     axisBorder: { show: false },
//     axisTicks: { show: false },
//     tooltip: { enabled: false },
//   },
//   yaxis: {
//     labels: { show: false },
//   },
// };

// const chartSeries = [
//   {
//     name: "Bitcoin",
//     data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 110, 130],
//   },
//   {
//     name: "Ethereum",
//     data: [20, 30, 25, 40, 39, 50, 60, 81, 105, 80, 90, 110],
//   },
//   {
//     name: "Ripple",
//     data: [15, 20, 18, 25, 22, 30, 40, 50, 60, 55, 65, 75],
//   },
//   {
//     name: "Cardano",
//     data: [10, 15, 12, 18, 16, 20, 25, 30, 35, 32, 38, 45],
//   },
//   {
//     name: "Solana",
//     data: [5, 10, 8, 12, 10, 15, 20, 25, 28, 26, 30, 35],
//   },
// ];

// export default function StatisticsChart () {////LiveCryptoPricesCard
//   return (
//     <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 dark:border-gray-800 dark:bg-gray-900 sm:p-6 h-[700px] w-full flex flex-col">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-semibold text-white">Live Crypto Prices</h3>
//       </div>

//       {/* Table and Chart Container */}
//       <div className="flex flex-col xl:flex-row h-full">
//         {/* Table Section */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 max-h-[300px] xl:max-h-full">
//           <table className="w-full text-left text-gray-400">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="py-2 px-1 font-normal text-sm">Coin</th>
//                 <th className="py-2 px-1 font-normal text-sm">Price (USD)</th>
//                 <th className="py-2 px-1 font-normal text-sm">24h Change (%)</th>
//                 <th className="py-2 px-1 font-normal text-sm hidden sm:table-cell">Market Cap</th>
//                 <th className="py-2 px-1 font-normal text-sm hidden sm:table-cell">Volume (24h)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cryptoData.map((item, index) => (
//                 <tr key={index} className="border-b border-gray-800">
//                   <td className="py-3 px-1">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={item.logo}
//                         alt={`${item.coin} logo`}
//                         className="w-7 h-7"
//                       />
//                       <span className="text-white text-sm">{item.coin}</span>
//                     </div>
//                   </td>
//                   <td className="py-3 px-1 text-sm">{item.price}</td>
//                   <td className="py-3 px-1 text-sm">
//                     <span className="text-green-500 font-medium">{item.change24h.green}</span>
//                     <span className="text-red-500 font-medium ml-1">{item.change24h.red}</span>
//                   </td>
//                   <td className="py-3 px-1 text-sm hidden sm:table-cell">{item.marketCap}</td>
//                   <td className="py-3 px-1 text-sm hidden sm:table-cell">{item.volume24h}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Chart Section */}
//         <div className="w-full xl:w-[60%] mt-6 xl:mt-0 xl:ml-6 flex flex-col justify-center items-center">
//           <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
//         </div>
//       </div>
//     </div>
//   );
// }








