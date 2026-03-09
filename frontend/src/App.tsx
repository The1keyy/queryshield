import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AnalyzerPage from "./pages/AnalyzerPage";
import HistoryPage from "./pages/HistoryPage";
import HighRiskPage from "./pages/HighRiskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/app" element={<AnalyzerPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/high-risk" element={<HighRiskPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

