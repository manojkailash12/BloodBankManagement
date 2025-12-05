import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';

function VerifyOTP({ setUser }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/verify-otp', { userId, otp });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/resend-otp', { userId });
      setSuccess('OTP resent successfully! Check your email.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to resend OTP');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '100px' }}>
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#667eea' }}>
          Verify Your Email
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
          We've sent a 6-digit OTP to {email}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength="6"
              pattern="[0-9]{6}"
              placeholder="000000"
              style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '10px' }}
            />
          </div>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Didn't receive the code?{' '}
          <button
            onClick={handleResend}
            style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}

export default VerifyOTP;
