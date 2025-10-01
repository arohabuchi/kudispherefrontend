import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

// ---- Reusable UI Components ----





interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ children, className = "", type = "button", disabled }: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm 
      font-semibold text-white shadow-sm hover:bg-indigo-500 
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
      focus-visible:outline-indigo-600 ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

// ---- OTP Form ----
export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const email: string = (location.state as { email?: string })?.email || "No email provided";

  // countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // handle OTP input change
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    setOtp((prev) => prev.map((d, i) => (i === index ? value : d)));

    if (value !== "" && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);
    const finalOtp = otp.join("");

    try {
      const res = await axios.post<{ msg: string }>(`http://localhost:8000/api/verify-otp`, {
        email,
        otp: finalOtp,
      });
      setMessage(res.data.msg);
      setIsError(false);
      navigate("/signin"); // redirect on success
    } catch (err) {
      const error = err as AxiosError<{ msg?: string }>;
      const errorMessage = error.response?.data?.msg || "An unexpected error occurred.";
      setMessage(errorMessage);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // resend OTP
  const handleResend = async () => {
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      await axios.post(`http://localhost:8000/api/resend-otp`, { email });
      setTimer(60);
      setMessage("A new OTP has been sent to your email.");
      setIsError(false);
    } catch (err) {
      const error = err as AxiosError<{ msg?: string }>;
      const errorMessage = error.response?.data?.msg || "Failed to resend OTP. Please try again later.";
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
              Reset your password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              A 6 digit email OTP was sent to <strong>{email}</strong>. Enter that code here to proceed
            </p>
          </div>

          {message && (
            <p className={`mb-4 text-sm text-center ${isError ? "text-red-500" : "text-green-600"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  maxLength={1}
                  className="w-10 h-10 text-center text-2xl font-bold border rounded-md shadow-sm 
                    focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 
                    dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                />
              ))}
            </div>

            <div className="flex justify-center mt-5 text-sm text-gray-500 dark:text-gray-400">
              <p>Didn't get OTP? - </p>
              {timer > 0 ? (
                <span className="ml-1">resend OTP in 00:{timer < 10 ? `0${timer}` : timer}</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="ml-1 text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  disabled={loading}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div className="mt-5">
              <Button
                className="w-full"
                size="sm"
                type="submit"
                disabled={loading || otp.join("").length !== 6}
              >
                {loading ? "Verifying..." : "Verify email OTP"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}













// import { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
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

// export default function OtpForm() {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [timer, setTimer] = useState(60);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);
//   const inputRefs = useRef([]);

//   // Get the email from the location state passed from the signup page
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email || "No email provided";

//   useEffect(() => {
//     const countdown = setInterval(() => {
//       setTimer((prev) => {
//         if (prev === 1) {
//           clearInterval(countdown);
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(countdown);
//   }, []);

//   const handleChange = (element, index) => {
//     const value = element.value;
//     if (isNaN(value)) return false;

//     setOtp([...otp.map((d, i) => (i === index ? value : d))]);

//     // Focus next input
//     if (value !== "" && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && otp[index] === "" && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setIsError(false);
//     const finalOtp = otp.join("");

//     try {
//       const res = await axios.post(`http://localhost:8000/api/verify-otp`, {
//         email,
//         otp: finalOtp
//       });
//       setMessage(res.data.msg);
//       setIsError(false);
//       // Redirect to the sign-in page on successful verification
//       navigate("/signin");
//     } catch (err) {
//       const errorMessage = err.response?.data?.msg || "An unexpected error occurred.";
//       setMessage(errorMessage);
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setLoading(true);
//     setMessage("");
//     setIsError(false);
//     try {
//       await axios.post(`http://localhost:8000/api/resend-otp`, { email });
//       setTimer(60);
//       setMessage("A new OTP has been sent to your email.");
//       setIsError(false);
//     } catch (err) {
//       const errorMessage = err.response?.data?.msg || "Failed to resend OTP. Please try again later.";
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
//               Reset your password
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               A 6 digit email OTP was sent to **{email}**. Enter that code here to proceed
//             </p>
//           </div>
//           <div>
//             {message && (
//               <p className={`mb-4 text-sm text-center ${isError ? "text-red-500" : "text-green-600"}`}>
//                 {message}
//               </p>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="flex justify-center space-x-2">
//                 {otp.map((data, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     name={`otp-${index}`}
//                     maxLength="1"
//                     className="w-10 h-10 text-center text-2xl font-bold border rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600"
//                     value={data}
//                     onChange={(e) => handleChange(e.target, index)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     ref={(el) => (inputRefs.current[index] = el)}
//                   />
//                 ))}
//               </div>

//               <div className="flex justify-center mt-5 text-sm text-gray-500 dark:text-gray-400">
//                 <p>Didn't get OTP? - </p>
//                 {timer > 0 ? (
//                   <span className="ml-1">resend OTP in 00:{timer < 10 ? `0${timer}` : timer}</span>
//                 ) : (
//                   <button type="button" onClick={handleResend} className="ml-1 text-brand-500 hover:text-brand-600 dark:text-brand-400" disabled={loading}>
//                     Resend OTP
//                   </button>
//                 )}
//               </div>

//               <div className="mt-5">
//                 <Button className="w-full" size="sm" type="submit" disabled={loading || otp.join("").length !== 6}>
//                   {loading ? "Verifying..." : "Verify email OTP"}
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
