import { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedTx, setSelectedTx] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      let token = localStorage.getItem("token");

      if (token && token.startsWith("{")) {
        try {
          token = JSON.parse(token).token;
        } catch (e) {
          console.error("Failed to parse token from localStorage", e);
          localStorage.removeItem("token");
          setIsLoading(false);
          return;
        }
      }

      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:8000/api/transaction/admin/all",
          { headers: { "x-auth-token": token } }
        );
        setTransactions(res.data);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // handle status update
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedTx) return;

    setIsSubmitting(true);
    let token = localStorage.getItem("token");
    if (token && token.startsWith("{")) {
      token = JSON.parse(token).token;
    }

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/status/${selectedTx._id}`,
        { status: selectedTx.status }, // ✅ only status is sent
        { headers: { "x-auth-token": token } }
      );

      // update table with new status
      setTransactions((prev) =>
        prev.map((tx) => (tx._id === res.data._id ? res.data : tx))
      );

      setSelectedTx(null); // close modal
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Failed to update transaction status");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Admin Transactions | TailAdmin Dashboard"
        description="View all user transactions as an admin"
      />
      <PageBreadcrumb pageTitle="Admin Transactions" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          All Transactions
        </h3>

        {isLoading ? (
          <p className="text-gray-500">Loading transactions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setSelectedTx(tx)}
                  >
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                      {tx.userId?.firstName} {tx.userId?.lastName}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                      {tx.userId?.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {tx.transactionType}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm font-medium ${
                        tx.status === "completed"
                          ? "text-green-600"
                          : tx.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.status}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Update Transaction Status
            </h3>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <select
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm text-gray-900 dark:bg-gray-800 dark:text-white"
                  value={selectedTx.status}
                  onChange={(e) =>
                    setSelectedTx({ ...selectedTx, status: e.target.value })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  onClick={() => setSelectedTx(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
