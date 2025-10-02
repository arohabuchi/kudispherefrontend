// import React from "react";
// // import { XIcon } from "./XIcon"; // adjust import path as needed

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
//         >
//           {/* <XIcon className="size-6" /> */}
//         </button>

//         {/* Title */}
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
