import React from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import { FaShieldAlt } from 'react-icons/fa';

interface SecurityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  actionColor: 'blue' | 'green';
}

const actionColors = {
  blue: 'bg-blue-600 text-white hover:bg-blue-700',
  green: 'bg-green-600 text-white hover:bg-green-700',
};

export default function FraudDetectionCard() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
            <FaShieldAlt size={32} className="text-green-600 dark:text-green-300" />
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Fraud Detection
        </h4>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          We monitor transactions in real-time to detect unusual activity and protect your funds.
        </p>
        <div className="mt-auto pt-4">
          <Button
            size="sm"
            className={`w-full ${actionColors.green} rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300`}
            onClick={openModal}
          >
            More
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Fraud Detection
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Learn how KudiSphere protects your transactions with advanced fraud detection.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[250px] overflow-y-auto px-2 pb-3 space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                At <span className="font-semibold">KudiSphere</span>, we take fraud prevention seriously. 
                Every transaction is analyzed in real time using intelligent risk models that look for 
                unusual patterns, suspicious activities, and potential red flags.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our system actively monitors for signs such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Unusual withdrawal amounts or frequency.</li>
                <li>Logins from unknown devices or locations.</li>
                <li>Transactions inconsistent with user history.</li>
                <li>Multiple failed login or transaction attempts.</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-300">
                Suspicious activity is flagged instantly, and our security team investigates further 
                to ensure your funds remain safe. We may temporarily pause certain transactions 
                until they are verified by you.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By combining technology and human oversight, we make sure you enjoy seamless payments 
                while staying protected against fraud.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={closeModal}>
                Got It
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
