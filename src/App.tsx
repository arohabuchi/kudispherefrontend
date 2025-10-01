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
import AdminBankDetailCard from "./components/UserProfile/AdminBankDetailCard";
import CreateAdminBankDetailCard from "./components/UserProfile/CreateAdminBankDetailCard";
import ImageUploadForm from "./components/UserProfile/ImageUploadForm";
import AdminCoinManager from "./components/UserProfile/AdminCoinManager";
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
              <Route path="/admin-bank-detail" element={<AdminBankDetailCard />} />
              <Route path="/admin-coin-upload" element={<ImageUploadForm />} />
              <Route path="/admin-coin-manager" element={<AdminCoinManager />} />
              <Route path="/create-admin-bank-detail" element={<CreateAdminBankDetailCard
               />} />
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