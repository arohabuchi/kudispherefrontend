import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import SecurityCard from "../components/security/SecurityCard";///FraudDetectionCard
import FraudDetectionCard from "../components/security/fraudCard";///ChangePasswordCard
import ChangePasswordCard from "../components/security/ChangePasswordCard";///
import { FaShieldAlt, FaLock, FaFingerprint } from "react-icons/fa"; // Using react-icons for a simple example.

export default function SecurityPage() {
  return (  
    <>
      <PageMeta
        title="Security Settings | TailAdmin - Next.js Admin Dashboard Template"
        description="This is a security settings page for a user dashboard."
      />
      <PageBreadcrumb pageTitle="Security" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Security Settings
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Data Encryption Card */}
          <SecurityCard
            title="Data Encryption"
            description="How Kudisphere protects your data with modern encryption.."
            icon={
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                <FaLock size={32} className="text-blue-500 dark:text-blue-300" />
              </div>
            }
            actionText="More"
            actionColor="blue"
          />

          {/* Multi-Factor Authentication Card */}
          <ChangePasswordCard
            title="Change Password"
            description="Do you think your account is compromised?."
            icon={
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
                <FaFingerprint size={32} className="text-green-500 dark:text-green-300" />
              </div>
            }
            actionText="Change Password"
            actionColor="green"
          />

          {/* Fraud Detection Card */}
          <FraudDetectionCard
            title="Fraud Detection"
            description="Lorem ipsum dolor sit amet, consecting coepisumet tneosod oicfret omut print neomims."
            icon={
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                <FaShieldAlt size={32} className="text-yellow-500 dark:text-yellow-300" />
              </div>
            }
            actionText="More"
            actionColor="blue"
          />

          {/* User Best Practices Card */}
          
        </div>
      </div>
    </>
  );
}