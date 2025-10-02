import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface AdminCoin {
  _id: string;
  name: string;
  coinType: string;
  image: string;
  currentPrice?: number;
  gasfee?: number;
}

export default function AdminCoinManager() {
  const [coins, setCoins] = useState<AdminCoin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<AdminCoin | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Fetch all coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get<AdminCoin[]>("${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/images/all");
        setCoins(res.data);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
      }
    };
    fetchCoins();
  }, []);

  // Handle update submit
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoin) return;

    const formData = new FormData();
    formData.append("name", selectedCoin.name);
    formData.append("coinType", selectedCoin.coinType);
    if (selectedCoin.currentPrice !== undefined)
      formData.append("currentPrice", String(selectedCoin.currentPrice));
    if (selectedCoin.gasfee !== undefined)
      formData.append("gasfee", String(selectedCoin.gasfee));
    if (file) formData.append("testImage", file);

    try {
      setLoading(true);
      setMessage(null);

      const res = await axios.put<AdminCoin>(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/images/${selectedCoin._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update the local list
      setCoins((prev) =>
        prev.map((c) => (c._id === res.data._id ? res.data : c))
      );
      setMessage("✅ Updated successfully!");
      setSelectedCoin(null);
      setFile(null);
    } catch (err) {
      const error = err as AxiosError<{ error?: string; msg?: string }>;
      setMessage(error.response?.data?.error || error.response?.data?.msg || "❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Admin Coins
      </h2>

      {/* List of Coins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div
            key={coin._id}
            onClick={() => setSelectedCoin(coin)}
            className="cursor-pointer rounded-lg border p-4 shadow-sm hover:shadow-md bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              src={`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/${coin.image}`}
              alt={coin.name}
              className="h-32 w-full object-contain mb-2"
            />
            <h3 className="font-semibold text-gray-800 dark:text-white">{coin.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {coin.coinType} | Price: {coin.currentPrice ?? "N/A"} | Gas:{" "}
              {coin.gasfee ?? "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Editing */}
      {selectedCoin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Update {selectedCoin.name}
            </h3>

            {message && (
              <p className="mb-2 text-sm text-red-500">{message}</p>
            )}

            <form onSubmit={handleUpdate} className="space-y-3">
              {/* Name */}
              <input
                type="text"
                value={selectedCoin.name}
                onChange={(e) =>
                  setSelectedCoin({ ...selectedCoin, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                required
              />

              {/* Coin Type */}
              <input
                type="text"
                value={selectedCoin.coinType}
                onChange={(e) =>
                  setSelectedCoin({ ...selectedCoin, coinType: e.target.value })
                }
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                required
              />

              {/* Current Price */}
              <input
                type="number"
                value={selectedCoin.currentPrice ?? ""}
                onChange={(e) =>
                  setSelectedCoin({
                    ...selectedCoin,
                    currentPrice: Number(e.target.value),
                  })
                }
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                placeholder="Current Price"
              />

              {/* Gas Fee */}
              <input
                type="number"
                value={selectedCoin.gasfee ?? ""}
                onChange={(e) =>
                  setSelectedCoin({
                    ...selectedCoin,
                    gasfee: Number(e.target.value),
                  })
                }
                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                placeholder="Gas Fee"
              />

              {/* File Upload */}
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-gray-800 dark:text-gray-100"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCoin(null)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
