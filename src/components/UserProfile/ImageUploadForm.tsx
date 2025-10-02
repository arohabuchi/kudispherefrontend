import { useState } from "react";
import axios, { AxiosError } from "axios";

interface UploadResponse {
  msg: string;
  image: {
    _id: string;
    name: string;
    coinType: string;
    image: string;
    currentPrice?: number;
    gasfee?: number;
  };
}

export default function ImageUploadForm() {
  const [name, setName] = useState("");
  const [coinType, setCoinType] = useState("USDT");
  const [currentPrice, setCurrentPrice] = useState<number | "">("");
  const [gasfee, setGasfee] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("❌ Please select an image file.");
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append("testImage", file);
    formData.append("name", name);
    formData.append("coinType", coinType);
    if (currentPrice !== "") formData.append("currentPrice", String(currentPrice));
    if (gasfee !== "") formData.append("gasfee", String(gasfee));

    try {
      setLoading(true);
      setMessage(null);

      const res = await axios.post<UploadResponse>(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ " + res.data.msg);
      setIsError(false);
      setName("");
      setCoinType("USDT");
      setCurrentPrice("");
      setGasfee("");
      setFile(null);
    } catch (err) {
      const error = err as AxiosError<{ msg?: string; error?: string }>;
      const errMsg =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        "❌ An error occurred while uploading.";
      setMessage(errMsg);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Upload Coin Image
        </h2>

        {message && (
          <p
            className={`mb-4 text-sm ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Coin Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Coin Type
            </label>
            <input
              type="text"
              value={coinType}
              onChange={(e) => setCoinType(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Current Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Price
            </label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Gas Fee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gas Fee
            </label>
            <input
              type="number"
              value={gasfee}
              onChange={(e) => setGasfee(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}
