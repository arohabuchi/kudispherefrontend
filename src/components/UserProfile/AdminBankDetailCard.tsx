import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { FaUniversity } from "react-icons/fa";

interface BankDetails {
  bankName: string;
  accountNumber: number;
  accountHolderName: string;
  feePerUSDT: number;
  usdtRate: number;
}

interface AdminBankDetail {
  _id: string;
  userId: string;
  bankDetails: BankDetails;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBankDetailCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [bankDetail, setBankDetail] = useState<AdminBankDetail | null>(null);
  const [form, setForm] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ Fetch the first AdminBankDetail from backend
  const fetchBankDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ No token found. Please log in again.");
        return;
      }

      const res = await fetch(
        "${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/first",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (res.status === 404) {
        // no detail exists yet
        setBankDetail(null);
        setForm({
          bankName: "",
          accountNumber: 0,
          accountHolderName: "",
          feePerUSDT: 0,
          usdtRate: 0,
        });
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(`❌ ${data.error || "Failed to fetch bank detail"}`);
        return;
      }

      setBankDetail(data);
      setForm(data.bankDetails);
    } catch (err) {
      console.error("Error fetching bank detail:", err);
      setError("❌ An error occurred while fetching bank details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "accountNumber" || name === "feePerUSDT" || name === "usdtRate"
          ? Number(value)
          : value,
    });
  };

  // ✅ Handle form submit (update only)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !bankDetail) return;

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ No token found. Please log in again.");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/bank-details/${bankDetail._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ bankDetails: form }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(`❌ ${data.error || "Failed to update bank detail"}`);
        return;
      }

      setMessage("✅ Bank details updated successfully!");
      setBankDetail(data.data);
      setForm(data.data.bankDetails);

      setTimeout(() => {
        closeModal();
        setMessage(null);
      }, 1500);
    } catch (err) {
      console.error("Error saving bank detail:", err);
      setError("❌ An error occurred while saving bank details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBankDetail();
    }
  }, [isOpen]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900">
            <FaUniversity
              size={32}
              className="text-blue-500 dark:text-blue-300"
            />
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Admin Bank Details
        </h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {bankDetail
            ? "Edit the admin’s bank account details."
            : "No bank details found."}
        </p>
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            onClick={openModal}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {bankDetail ? "Edit Bank Details" : "Add Bank Details"}
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {bankDetail ? "Update Bank Detail" : "Create Bank Detail"}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {bankDetail
                ? "Update the admin’s bank account information below."
                : "Enter the admin’s bank account information below."}
            </p>
          </div>

          {loading && !form ? (
            <p className="text-blue-500">Loading bank details...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : form ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Number
                </label>
                <input
                  type="number"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Account Holder
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fee Per USDT
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="feePerUSDT"
                  value={form.feePerUSDT}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  USDT Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="usdtRate"
                  value={form.usdtRate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              {message && (
                <p
                  className={`text-sm mt-2 ${
                    message.startsWith("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mt-6 flex items-center gap-3 lg:justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button size="sm" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-gray-500">No bank detail found.</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
