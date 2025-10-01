import React, { useEffect, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";

interface BankDetails {
  bankName: string;
  accountNumber: number;
  accountHolderName: string;
  feePerUSDT: number;
  usdtRate: number;
}

export default function CreateAdminBankDetailCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [userId, setUserId] = useState<string>("");
  const [form, setForm] = useState<BankDetails>({
    bankName: "",
    accountNumber: 0,
    accountHolderName: "",
    feePerUSDT: 0,
    usdtRate: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ Fetch logged-in userId when modal opens
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("❌ No token found. Please log in again.");
          return;
        }

        const res = await axios.get("http://localhost:8000/api/profile", {
          headers: { "x-auth-token": token },
        });

        setUserId(res.data._id);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("❌ Failed to fetch user profile.");
      }
    };

    if (isOpen) fetchUserId();
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "accountNumber" || name === "feePerUSDT" || name === "usdtRate"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("❌ User ID is missing.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("❌ No token found. Please log in again.");
        return;
      }

      const res = await fetch("http://localhost:8000/api/admin/bank-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ userId, bankDetails: form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(`❌ ${data.error || "Failed to create bank detail"}`);
        return;
      }

      setMessage("✅ Admin bank detail created successfully!");
      setForm({
        bankName: "",
        accountNumber: 0,
        accountHolderName: "",
        feePerUSDT: 0,
        usdtRate: 0,
      });

      setTimeout(() => {
        closeModal();
        setMessage(null);
      }, 1500);
    } catch (err) {
      console.error("Error creating bank detail:", err);
      setError("❌ An error occurred while creating bank detail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
            <FaPlusCircle size={32} className="text-green-500 dark:text-green-300" />
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Add Admin Bank Detail
        </h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Create a new admin bank account detail record.
        </p>
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            onClick={openModal}
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Add Bank Detail
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Create Admin Bank Detail
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Enter the new admin bank account details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2">
            <div>
              <label className="block text-sm font-medium mb-1">Bank Name</label>
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
              <label className="block text-sm font-medium mb-1">Account Number</label>
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
              <label className="block text-sm font-medium mb-1">Account Holder</label>
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
              <label className="block text-sm font-medium mb-1">Fee Per USDT</label>
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
              <label className="block text-sm font-medium mb-1">USDT Rate</label>
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

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

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
                {loading ? "Saving..." : "Save Bank Detail"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
