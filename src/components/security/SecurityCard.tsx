import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface SecurityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  actionColor: "blue" | "green";
}

const actionColors = {
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  green: "bg-green-600 text-white hover:bg-green-700",
};

export default function SecurityCard({
  title,
  description,
  icon,
  actionText,
  actionColor,
}: SecurityCardProps) {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <div className="mb-4">{icon}</div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h4>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            className={`w-full ${actionColors[actionColor]} rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300`}
            onClick={openModal}
          >
            {actionText}
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[900px] m-4">
        <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
          {/* Header */}
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
              {title}
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              How Kudisphere protects your data with modern encryption.
            </p>
          </div>

          {/* Scrollable Body */}
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3 space-y-6">
              {/* Section */}
              <section>
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  🔒 What we protect
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  We encrypt your personal information, authentication data,
                  payment details, transaction records, and backups to keep your
                  data secure.
                </p>
              </section>

              <section>
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  🌐 Data in transit
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  All traffic between your browser/app and Kudisphere is secured
                  with TLS 1.2/1.3, HSTS, and secure cookies to prevent
                  interception.
                </p>
              </section>

              <section>
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  💾 Data at rest
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Sensitive fields are encrypted with AES-256-GCM. Passwords are
                  hashed with Argon2id/bcrypt. Private keys (if custodial) are
                  kept in secure HSMs, never in plaintext.
                </p>
              </section>

              <section>
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  🔑 Key management
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Keys are managed in a dedicated KMS/HSM, rotated regularly,
                  separated by purpose, and protected with role-based access
                  controls.
                </p>
              </section>

              <section>
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  🛡️ Extra protections
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                  <li>Tokenization of sensitive fields</li>
                  <li>Strict least-privilege access control</li>
                  <li>Encrypted and sanitized logs</li>
                  <li>Secure development lifecycle & code reviews</li>
                  <li>Multi-Factor Authentication (MFA)</li>
                </ul>
              </section>

              <section>
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  🧑‍💻 User guidance
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Use strong passwords, enable MFA, never share your recovery
                  keys, and always verify you’re on{" "}
                  <span className="font-medium text-gray-800 dark:text-white">
                    kudisphere.com
                  </span>{" "}
                  before logging in.
                </p>
              </section>
            </div>

            {/* Footer buttons */}
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
