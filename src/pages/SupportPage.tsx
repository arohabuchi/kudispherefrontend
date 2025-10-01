import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Props for FAQItem
interface FAQItemProps {
  question: string;
  answer: string;
}

// A single reusable component for the FAQ accordion items
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={toggleOpen}
      >
        <h5 className="text-sm font-medium text-gray-800 dark:text-white/90">
          {question}
        </h5>
        <svg
          className={`fill-current text-gray-500 transition-transform duration-300 dark:text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 11.5L2.5 6L3.5 5L8 9.5L12.5 5L13.5 6L8 11.5Z"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
};

// Type for FAQ data
interface FAQ {
  question: string;
  answer: string;
}

export default function SupportPage() {
  const faqData: FAQ[] = [
    {
      question: "How do I reset my password?",
      answer:
        "You will be able to reset your password from the account settings page. Click the 'Reset Password' button and follow the instructions to create a new password.",
    },
    {
      question: "What are the transaction limits?",
      answer:
        "A daily transaction limit of $5000 is applied to all accounts. This can be increased by verifying your identity with our support team.",
    },
    {
      question: "Is my data secure?",
      answer:
        "A very strong security infrastructure protects your data. We use industry-standard encryption and fraud detection to ensure your information is safe.",
    },
  ];

  return (
    <>
      <PageMeta
        title="Support Page | TailAdmin - Next.js Admin Dashboard Template"
        description="This is the support and help page for the dashboard template."
      />
      <PageBreadcrumb pageTitle="Support" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Support
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Frequently Asked Questions
            </h4>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>

          {/* Contact Support & Help Topics Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Support Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                Contact Support
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 fill-current text-gray-500 dark:text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <span className="text-gray-800 dark:text-white/90">
                    Live Chat
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 fill-current text-gray-500 dark:text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="text-gray-800 dark:text-white/90">
                    Email Us
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 fill-current text-gray-500 dark:text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24.96.32 2.03.52 3.16.52.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.13.2 2.2.52 3.16.12.35.03.75-.24 1.02l-2.2 2.2z" />
                  </svg>
                  <span className="text-gray-800 dark:text-white/90">
                    Call Us
                  </span>
                </div>
              </div>
            </div>

            {/* Help Topics Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
              <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                Help Topics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Account Management
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Transactions
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Security
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Troubleshooting
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Security
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Troubleshooting
                  </p>
                  <p className="text-sm text-gray-800 dark:text-white/90">
                    Getting Started
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}









// import React, { useState } from "react";
// import PageBreadcrumb from "../components/common/PageBreadCrumb";
// import PageMeta from "../components/common/PageMeta";
// import Navbar from "../components/landingComponoent/navbar";

// // A single reusable component for the FAQ accordion items
// const FAQItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleOpen = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="border-b border-gray-200 dark:border-gray-800">
//       <div
//         className="flex cursor-pointer items-center justify-between p-4"
//         onClick={toggleOpen}
//       >
//         <h5 className="text-sm font-medium text-gray-800 dark:text-white/90">
//           {question}
//         </h5>
//         <svg
//           className={`fill-current text-gray-500 transition-transform duration-300 dark:text-gray-400 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//           width="16"
//           height="16"
//           viewBox="0 0 16 16"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M8 11.5L2.5 6L3.5 5L8 9.5L12.5 5L13.5 6L8 11.5Z"
//           />
//         </svg>
//       </div>
//       {isOpen && (
//         <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
//           {answer}
//         </div>
//       )}
//     </div>
//   );
// };

// export default function SupportPage() {
//   const faqData = [
//     {
//       question: "How do I reset my password?",
//       answer:
//         "You will be able to reset your password from the account settings page. Click the 'Reset Password' button and follow the instructions to create a new password.",
//     },
//     {
//       question: "What are the transaction limits?",
//       answer:
//         "A daily transaction limit of $5000 is applied to all accounts. This can be increased by verifying your identity with our support team.",
//     },
//     {
//       question: "What are the transaction limits?",
//       answer:
//         "A daily transaction limit of $5000 is applied to all accounts. This can be increased by verifying your identity with our support team.",
//     },
//     {
//       question: "Is my data secure?",
//       answer:
//         "A very strong security infrastructure protects your data. We use industry-standard encryption and fraud detection to ensure your information is safe.",
//     },
//     {
//       question: "Is my data secure?",
//       answer:
//         "A very strong security infrastructure protects your data. We use industry-standard encryption and fraud detection to ensure your information is safe.",
//     },
//   ];

//   return (
//     <>
//       <PageMeta
//         title="Support Page | TailAdmin - Next.js Admin Dashboard Template"
//         description="This is the support and help page for the dashboard template."
//       />
//       <PageBreadcrumb pageTitle="Support" />
       

//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//         <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
//           Support
//         </h3>
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* FAQ Section */}
//           <div className="lg:col-span-2">
//             <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
//               Frequently Asked Questions
//             </h4>
//             <div className="space-y-4">
//               {faqData.map((faq, index) => (
//                 <FAQItem key={index} question={faq.question} answer={faq.answer} />
//               ))}
//             </div>
//           </div>

//           {/* Contact Support & Help Topics Section */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Contact Support Card */}
//             <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//               <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
//                 Contact Support
//               </h4>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="h-6 w-6 fill-current text-gray-500 dark:text-gray-400"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
//                   </svg>
//                   <span className="text-gray-800 dark:text-white/90">Live Chat</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="h-6 w-6 fill-current text-gray-500 dark:text-gray-400"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//                   </svg>
//                   <span className="text-gray-800 dark:text-white/90">Email Us</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg
//                     className="h-6 w-6 fill-current text-gray-500 dark:text-gray-400"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24.96.32 2.03.52 3.16.52.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.13.2 2.2.52 3.16.12.35.03.75-.24 1.02l-2.2 2.2z" />
//                   </svg>
//                   <span className="text-gray-800 dark:text-white/90">Call Us</span>
//                 </div>
//               </div>
//             </div>

//             {/* Help Topics Card */}
//             <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//               <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
//                 Help Topics
//               </h4>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-800 dark:text-white/90">Account Management</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">Transactions</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">Security</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">Troubleshooting</p>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-sm text-gray-800 dark:text-white/90">Security</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">Troubleshooting</p>
//                   <p className="text-sm text-gray-800 dark:text-white/90">Getting Started</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }