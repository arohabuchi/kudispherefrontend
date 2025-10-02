import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

// ✅ NEW: Reuse same User type as SignUp.tsx
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  isVerified: boolean;
  amount: number;
  payout: number;
  createdAt: string;
  updatedAt: string;
}

// ------------------- Mock Components -------------------
const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
      9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
      0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeCloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.25A10.024 10.024 0 
      0112 19c-4.477 0-8.268-2.943-9.542-7 
      1.274-4.057 5.064-7 9.542-7c.758 
      0 1.503.111 2.223.328M15 12a3 3 
      0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.625 10.75A10.024 10.024 0 
      0120 12c-1.274 4.057-5.064 7-9.542 
      7-1.396 0-2.739-.245-4.01-.689"
    />
  </svg>
);

const Checkbox = ({
  checked,
  onChange,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className={className}
  />
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
    {children}
  </label>
);

const Input = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mt-2">
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
        focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
        dark:bg-gray-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-500"
    />
  </div>
);


// ✅ NEW: Props now expect React.Dispatch
interface SignUpFormProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// ------------------- Component -------------------
export default function SignUpForm({ setUser }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // ✅ Expect token + user back
      const res = await axios.post<{ token: string; user: User }>(
        "/api/signup",
        formData
      );
      localStorage.setItem("token", res.data.token);

      // ✅ Pass typed user to parent state
      setUser(res.data.user);

      navigate("/verify-forgot-password-otp", { state: { email: formData.email } });
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      setError(axiosErr.response?.data?.message || "Registration Failed");
    }
  };

 
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* First Name */}
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Last Name */}
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}














// import { Link, useNavigate } from "react-router-dom";
// import axios, { AxiosError } from "axios";
// import { useState, ChangeEvent, FormEvent } from "react";

// // ------------------- Types -------------------
// interface SignUpFormProps {
//   setUser: (user: unknown) => void;
// }

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// // ------------------- Mock Components -------------------
// const EyeIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
//       9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
//       0-8.268-2.943-9.542-7z"
//     />
//   </svg>
// );

// const EyeCloseIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M13.875 18.25A10.024 10.024 0 
//       0112 19c-4.477 0-8.268-2.943-9.542-7 
//       1.274-4.057 5.064-7 9.542-7c.758 
//       0 1.503.111 2.223.328M15 12a3 3 
//       0 11-6 0 3 3 0 016 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M18.625 10.75A10.024 10.024 0 
//       0120 12c-1.274 4.057-5.064 7-9.542 
//       7-1.396 0-2.739-.245-4.01-.689"
//     />
//   </svg>
// );

// const Checkbox = ({
//   checked,
//   onChange,
//   className,
// }: {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   className?: string;
// }) => (
//   <input
//     type="checkbox"
//     checked={checked}
//     onChange={(e) => onChange(e.target.checked)}
//     className={className}
//   />
// );

// const ChevronLeftIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className={className}
//   >
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const Label = ({ children }: { children: React.ReactNode }) => (
//   <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
//     {children}
//   </label>
// );

// const Input = ({
//   type,
//   id,
//   name,
//   placeholder,
//   value,
//   onChange,
// }: {
//   type: string;
//   id: string;
//   name: string;
//   placeholder?: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }) => (
//   <div className="mt-2">
//     <input
//       type={type}
//       id={id}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
//         ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
//         focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
//         dark:bg-gray-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-500"
//     />
//   </div>
// );

// // ------------------- Component -------------------
// export default function SignUpForm({ setUser }: SignUpFormProps) {
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [isChecked, setIsChecked] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<string>("");
//   const navigate = useNavigate();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post<{ token: string }>("/api/signup", formData);
//       localStorage.setItem("token", res.data.token);

//       setUser(res.data);

//       // Redirect with email
//       navigate("/verify-forgot-password-otp", { state: { email: formData.email } });
//     } catch (err) {
//       const axiosErr = err as AxiosError<{ message?: string }>;
//       setError(axiosErr.response?.data?.message || "Registration Failed");
//     }
//   };

//   return (
//     <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
//       <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
//         <Link
//           to="/"
//           className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <ChevronLeftIcon className="size-5" />
//           Back to dashboard
//         </Link>
//       </div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               Sign Up
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Enter your email and password to sign up!
//             </p>
//           </div>
//           <div>
//             {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

//             <form onSubmit={handleSubmit}>
//               <div className="space-y-5">
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                   {/* First Name */}
//                   <div className="sm:col-span-1">
//                     <Label>
//                       First Name<span className="text-error-500">*</span>
//                     </Label>
//                     <Input
//                       type="text"
//                       id="fname"
//                       name="firstName"
//                       placeholder="Enter your first name"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   {/* Last Name */}
//                   <div className="sm:col-span-1">
//                     <Label>
//                       Last Name<span className="text-error-500">*</span>
//                     </Label>
//                     <Input
//                       type="text"
//                       id="lname"
//                       name="lastName"
//                       placeholder="Enter your last name"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <Label>
//                     Email<span className="text-error-500">*</span>
//                   </Label>
//                   <Input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <Label>
//                     Password<span className="text-error-500">*</span>
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       placeholder="Enter your password"
//                       type={showPassword ? "text" : "password"}
//                       id="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Checkbox */}
//                 <div className="flex items-center gap-3">
//                   <Checkbox
//                     className="w-5 h-5"
//                     checked={isChecked}
//                     onChange={setIsChecked}
//                   />
//                   <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
//                     By creating an account means you agree to the{" "}
//                     <span className="text-gray-800 dark:text-white/90">
//                       Terms and Conditions,
//                     </span>{" "}
//                     and our{" "}
//                     <span className="text-gray-800 dark:text-white">
//                       Privacy Policy
//                     </span>
//                   </p>
//                 </div>

//                 {/* Submit Button */}
//                 <div>
//                   <button
//                     type="submit"
//                     className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               </div>
//             </form>

//             <div className="mt-5">
//               <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
//                 Already have an account?{" "}
//                 <Link
//                   to="/signin"
//                   className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Sign In
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useState } from "react";

// // Mock components to make the code self-contained and runnable
// const EyeIcon = ({ className }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//   </svg>
// );

// const EyeCloseIcon = ({ className }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.25A10.024 10.024 0 0112 19c-4.477 0-8.268-2.943-9.542-7 1.274-4.057 5.064-7 9.542-7c.758 0 1.503.111 2.223.328M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.625 10.75A10.024 10.024 0 0120 12c-1.274 4.057-5.064 7-9.542 7-1.396 0-2.739-.245-4.01-.689" />
//   </svg>
// );

// const Checkbox = ({ checked, onChange, className }) => (
//   <input
//     type="checkbox"
//     checked={checked}
//     onChange={(e) => onChange(e.target.checked)}
//     className={className}
//   />
// );

// const ChevronLeftIcon = ({ className }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//   </svg>
// );

// const Label = ({ children }) => (
//   <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">{children}</label>
// );

// const Input = ({ type, id, name, placeholder, value, onChange }) => (
//   <div className="mt-2">
//     <input
//       type={type}
//       id={id}
//       name={name}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-gray-50 dark:ring-gray-600 dark:focus:ring-indigo-500"
//     />
//   </div>
// );

// export default function SignUpForm({ setUser }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     password:"",
//   });
//   const [error, setError]=useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({...formData, [e.target.name]: e.target.value})
//   };

//   const handleSubmit = async (e) =>{
//     e.preventDefault();
//     try {
//       const res= await axios.post("/api/signup", formData);
//       localStorage.setItem("token", res.data.token);
//       console.log(res.data);
//       setUser(res.data);
      
//       // Redirect to the OTP verification page with the user's email
//       navigate("/verify-forgot-password-otp", { state: { email: formData.email } });
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration Failed")
//     }
//   }

//   return (
//     <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
//       <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
//         <Link
//           to="/"
//           className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <ChevronLeftIcon className="size-5" />
//           Back to dashboard
//         </Link>
//       </div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               Sign Up
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Enter your email and password to sign up!
//             </p>
//           </div>
//           <div>
//             {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

//             <form onSubmit={handleSubmit}>
//               <div className="space-y-5">
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                   {/* <!-- First Name --> */}
//                   <div className="sm:col-span-1">
//                     <Label>
//                       First Name<span className="text-error-500">*</span>
//                     </Label>
//                     <Input
//                       type="text"
//                       id="fname"
//                       name="firstName"
//                       placeholder="Enter your first name"
//                       value={formData.firstName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   {/* <!-- Last Name --> */}
//                   <div className="sm:col-span-1">
//                     <Label>
//                       Last Name<span className="text-error-500">*</span>
//                     </Label>
//                     <Input
//                       type="text"
//                       id="lname"
//                       name="lastName"
//                       placeholder="Enter your last name"
//                       value={formData.lastName}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 {/* <!-- Email --> */}
//                 <div>
//                   <Label>
//                     Email<span className="text-error-500">*</span>
//                   </Label>
//                   <Input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 {/* <!-- Password --> */}
//                 <div>
//                   <Label>
//                     Password<span className="text-error-500">*</span>
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       placeholder="Enter your password"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 {/* <!-- Checkbox --> */}
//                 <div className="flex items-center gap-3">
//                   <Checkbox
//                     className="w-5 h-5"
//                     checked={isChecked}
//                     onChange={setIsChecked}
//                   />
//                   <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
//                     By creating an account means you agree to the{" "}
//                     <span className="text-gray-800 dark:text-white/90">
//                       Terms and Conditions,
//                     </span>{" "}
//                     and our{" "}
//                     <span className="text-gray-800 dark:text-white">
//                       Privacy Policy
//                     </span>
//                   </p>
//                 </div>
//                 {/* <!-- Button --> */}
//                 <div>
//                   <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
//                     Sign Up
//                   </button>
//                 </div>
//               </div>
//             </form>

//             <div className="mt-5">
//               <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
//                 Already have an account? {""}
//                 <Link
//                   to="/signin"
//                   className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Sign In
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
