import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

// ✅ Label props
type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
};

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
  >
    {children}
  </label>
);

// ✅ Input props
type InputProps = {
  placeholder?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  name,
  value,
  onChange,
}) => (
  <div className="mt-2">
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
        focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
        dark:bg-gray-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-500"
    />
  </div>
);

// ✅ Button props
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  type = "button",
  disabled = false,
}) => (
  <button
    type={type}
    disabled={disabled}
    className={`flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm 
      hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
      ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

// ✅ ChevronLeftIcon props
type ChevronLeftIconProps = React.SVGProps<SVGSVGElement>;

const ChevronLeftIcon: React.FC<ChevronLeftIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/forgot-password`, { email });
      navigate("/forgot-password-link-sent");
    } catch (err) {
      const error = err as AxiosError<{ msg?: string }>;
      const errorMessage =
        error.response?.data?.msg || "An unexpected error occurred.";
      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center w-full max-w-sm mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div>
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Password Reset
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Provide the email address associated with your account to recover your password.
            </p>
          </div>

          {message && (
            <p
              className={`mb-4 text-sm text-center ${
                isError ? "text-red-500" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  placeholder="name@example.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Reset Password"}
                </Button>
              </div>
            </div>
          </form>

          <div className="flex flex-row justify-between w-full mt-5">
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              <Link
                to="/signin"
                className="flex items-center text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" /> Login
              </Link>
            </p>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}










// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// // Mock components to make the code self-contained and runnable
// const Label = ({ children, htmlFor }) => (
//   <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
//     {children}
//   </label>
// );

// const Input = ({ placeholder, type, name, value, onChange }) => (
//   <div className="mt-2">
//     <input
//       id={name}
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-500"
//     />
//   </div>
// );

// const Button = ({ children, className, size, type, disabled }) => (
//   <button
//     type={type}
//     disabled={disabled}
//     className={`flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//   >
//     {children}
//   </button>
// );

// const ChevronLeftIcon = (props) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );


// export default function ForgotPasswordForm() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setIsError(false);
    
//     try {
//       await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/forgot-password`, { email });
//       // If the request is successful, redirect to the OTP verification page
//       navigate("/forgot-password-link-sent");
//     } catch (err) {
//       const errorMessage = err.response?.data?.msg || "An unexpected error occurred.";
//       setMessage(errorMessage);
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1 min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
//       <div className="flex flex-col justify-center w-full max-w-sm mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
//         <div>
//           <div className="mb-5 sm:mb-8 text-center">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               Password Reset
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Provide the email address associated with your account to recover your password.
//             </p>
//           </div>
//           <div>
//             {message && (
//               <p className={`mb-4 text-sm text-center ${isError ? "text-red-500" : "text-green-600"}`}>
//                 {message}
//               </p>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 <div>
//                   <Label htmlFor="email">
//                     Email <span className="text-error-500">*</span>{" "}
//                   </Label>
//                   <Input
//                     placeholder="name@example.com"
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Button className="w-full" size="sm" type="submit" disabled={loading}>
//                     {loading ? "Sending..." : "Reset Password"}
//                   </Button>
//                 </div>
//               </div>
//             </form>

//             <div className="flex flex-row justify-between w-full mt-5">
//               <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
//                 <Link
//                   to="/signin"
//                   className="flex items-center text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   <ChevronLeftIcon className="w-4 h-4 mr-1" /> Login
//                 </Link>
//               </p>
//               <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
//                 <Link
//                   to="/signup"
//                   className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Register
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }