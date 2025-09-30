import { useEffect, useState } from "react";
import axios from "axios";

import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export default function UserMetaCard() {
  const { isOpen, openModal, closeModal } = useModal();

  // State for user
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged in user
  useEffect(() => {
    const fetchUser = async () => {
      let token = localStorage.getItem("token");

      // Handle JSON stringified token
      if (token && token.startsWith("{")) {
        try {
          const parsedToken = JSON.parse(token);
          token = parsedToken.token;
        } catch (e) {
          console.error("Failed to parse token:", e);
          localStorage.removeItem("token");
          setIsLoading(false);
          return;
        }
      }

      if (token) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/profile`, {
            headers: { "x-auth-token": token },
          });
          console.log("Fetched user:", res.data);
          setUser(res.data);
        } catch (err) {
          console.error("Fetch user error:", err);
          setError("Failed to fetch user data");
        } finally {
          setIsLoading(false);
        }
      } else {
        console.log("No valid token found.");
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSave = () => {
    console.log("Saving changes...");
    closeModal();
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            {/* Avatar */}
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img src="/images/user/owner.jpg" alt="user" />
            </div>

            {/* User Info */}
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {isLoading
                  ? "Loading..."
                  : error
                  ? "Unknown User"
                  : user?.firstName|| "Guest User"}
              </h4>

              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isLoading
                  ? "Loading..."
                  : error
                  ? " User"
                  : user?.role || "User"}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} title="Edit Profile">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={user?.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Modal>
    </>
  );
}
