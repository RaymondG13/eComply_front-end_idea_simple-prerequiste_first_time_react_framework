import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages (we'll create these next)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AuditPage from './pages/AuditPage';
import ReportPage from './pages/ReportPage';
import EducationPage from './pages/EducationPage';

function App() {
  return (
    <Router>
      <div className="screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/education" element={<EducationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
