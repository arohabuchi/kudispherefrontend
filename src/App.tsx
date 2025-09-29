import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard/Home";
import UserProfiles from "./pages/UserProfiles";
import SecurityPage from "./pages/security";
import SupportPage from "./pages/SupportPage";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import LandingPage from "./pages/landingPage";
import ForgotPasswordForm from "./components/auth/forgotPasswordForm";
import OtpForm from "./components/auth/forgotPasswordOTP";
import NotFound from "./pages/OtherPage/NotFound";
import { ScrollToTop } from "./components/common/ScrollToTop";
import NewPasswordforgetPasswordform from "./components/auth/newPasswordforgetPasswordform";
import ForgotPasswordLinkSent from "./components/auth/forgotpasswordlinksent";
import AdminTransactionsList from "./components/UserProfile/AdminTransactionUpdatePage";
          // import ResetPasswordForm from "./components/auth/ResetPasswordForm";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/admin-trnsaction-list-all" element={<AdminTransactionsList />} />
            </Route>
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/forgot-password-link-sent" element={<ForgotPasswordLinkSent />} />
          <Route path="/verify-forgot-password-otp" element={<OtpForm />} />
          <Route path="/forgot-password-reset/:token" element={<NewPasswordforgetPasswordform />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}


















// import { BrowserRouter as Router, Routes, Route } from "react-router";
// // import SignIn from "./pages/AuthPages/SignIn";
// import SignInForm from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import { useEffect, useState } from "react";
// import LandingPage from "./pages/landingPage";
// import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";
// import Dashboard from "./pages/Dashboard/Home";
// import SecurityPage from "./pages/security";
// import SupportPage from "./pages/SupportPage";
// import axios from "axios";
// import ForgotPasswordForm from "./components/auth/forgotPasswordForm";
// import OtpForm from "./components/auth/forgotPasswordOTP";
// export default function App() {
//   const [user, setUser]= useState(null);
//   const [error, setError]= useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(()=>{
//     const fetchUser= async ()=>{
//       const tokens =localStorage.getItem("token");
//       console.log(tokens)
//         if (tokens) {
//           try {
//             const res  = await axios.get("http://localhost:8000/api/profile", {
//               headers: {Authorization: `token ${tokens}`}
//             });
//             setUser(res.data)
//             console.log(res.data)
//           } catch (err) {
//             setError("Failed to fetch user data");
//             // localStorage.removeItem("token")
//           }finally {
//           setIsLoading(false); // Set loading to false after the fetch is complete
//         }
//       } else {
//         setIsLoading(false); // Also set loading to false if no token is found
//       }
//     };
//     fetchUser();
//   }, []);

  
//   return (
//     <>
    
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Dashboard Layout */}
          
//           <Route element={<AppLayout />}>
//             <Route index path="/dashboard" element={<Dashboard />} />

//             {/* Others Page */}
//             <Route path="/profile" element={<UserProfiles />} />
//             <Route path="/Security" element={<SecurityPage />} />
//             <Route path="/support" element={<SupportPage />} />


//           </Route>

//           {/* Auth Layout */}

//           <Route path="/signin" element={<SignInForm />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordForm />} />
//           <Route path="/verify-forgot-password-otp" element={<OtpForm />} />

//           {/* Fallback Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }
