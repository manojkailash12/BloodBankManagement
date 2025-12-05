import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', formData);
      console.log('Login response:', data.user); // Debug log
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '550px', marginTop: '80px', padding: '20px' }}>
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {/* Header with blood bag image */}
        <div style={{
          background: 'linear-gradient(135deg, #5c9ead 0%, #7eb3c4 100%)',
          padding: '30px 20px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <div style={{ fontSize: '40px' }}>💉</div>
            <div>
              <h2 style={{ color: '#c31432', margin: 0, fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: 'bold' }}>350 ml Blood</h2>
              <p style={{ color: '#c31432', margin: 0, fontSize: 'clamp(14px, 3vw, 18px)' }}>Can Save Precious Lives</p>
            </div>
            <div style={{ fontSize: '40px', display: 'flex', gap: '5px' }}>
              <span>🧑</span><span>👨</span><span>👩</span><span>🧒</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ color: '#999', fontSize: '14px' }}>Username</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Enter your email"
                style={{ 
                  background: '#fffacd',
                  border: '1px solid #e0e0e0',
                  padding: '14px'
                }}
              />
            </div>
            <div className="form-group">
              <label style={{ color: '#999', fontSize: '14px' }}>Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Enter your password"
                style={{ 
                  background: '#fffacd',
                  border: '1px solid #e0e0e0',
                  padding: '14px'
                }}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button 
              type="submit" 
              className="btn" 
              style={{ 
                width: '100%',
                background: 'linear-gradient(135deg, #c31432 0%, #b71c1c 100%)',
                color: 'white',
                padding: '14px',
                fontSize: '18px',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '25px',
                marginTop: '10px'
              }} 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '15px' }}>
            Don't have an account? <Link to="/register" style={{ color: '#c31432', fontWeight: '600' }}>Register Here</Link>
          </p>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/forgot-password" style={{ color: '#999', fontSize: '14px' }}>Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
