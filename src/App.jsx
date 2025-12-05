import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterChoice from './pages/RegisterChoice';
import RegisterDonor from './pages/RegisterDonor';
import RegisterReceiver from './pages/RegisterReceiver';
import RegisterAdmin from './pages/RegisterAdmin';
import VerifyOTP from './pages/VerifyOTP';
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import FindBloodBanks from './pages/FindBloodBanks';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Users from './pages/Users';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="blood-drop-bg">🩸</div>
      <div className="blood-drop-bg">💉</div>
      <div className="blood-drop-bg">❤️</div>
      <div className="blood-drop-bg">🏥</div>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterChoice />} />
        <Route path="/register-donor" element={user ? <Navigate to="/dashboard" /> : <RegisterDonor />} />
        <Route path="/register-receiver" element={user ? <Navigate to="/dashboard" /> : <RegisterReceiver />} />
        <Route path="/register-admin" element={user ? <Navigate to="/dashboard" /> : <RegisterAdmin />} />
        <Route path="/verify-otp" element={<VerifyOTP setUser={setUser} />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} /></ProtectedRoute>} />
        <Route path="/donations" element={<ProtectedRoute><Donations user={user} /></ProtectedRoute>} />
        <Route path="/find-blood-banks" element={<ProtectedRoute><FindBloodBanks /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics user={user} /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports user={user} /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users user={user} /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword user={user} /></ProtectedRoute>} />
        <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
