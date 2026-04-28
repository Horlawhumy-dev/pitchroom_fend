import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import PracticeSetup from "./pages/practice/PracticeSetup";
import PracticeInterface from "./pages/practice/PracticeInterface";
import PitchReports from "./pages/reports/PitchReports";
import QuestionBank from "./pages/QuestionBank";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AIGovernanceFoundations from "./pages/AIGovernanceFoundations";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ai-governance-foundations" element={<AIGovernanceFoundations />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Core Product Routes - Protected */}
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/practice" element={<ProtectedRoute><PracticeInterface /></ProtectedRoute>} />
          <Route path="/practice/setup" element={<ProtectedRoute><PracticeSetup /></ProtectedRoute>} />
          <Route path="/practice/session" element={<ProtectedRoute><PracticeInterface /></ProtectedRoute>} />
          <Route path="/simulator" element={<ProtectedRoute><PracticeInterface /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><PitchReports /></ProtectedRoute>} />
          <Route path="/question-bank" element={<ProtectedRoute><QuestionBank /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </Router>
  );
}

export default App;
