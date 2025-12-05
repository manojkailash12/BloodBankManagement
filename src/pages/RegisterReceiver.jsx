import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

function RegisterReceiver() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', bloodType: 'A+',
    phone: '', age: '', address: '', role: 'receiver'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/register', formData);
      navigate('/verify-otp', { state: { userId: data.userId, email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '50px' }}>
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#dc3545' }}>
          🏥 Register as Blood Receiver
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
          Request blood when you need it
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Blood Type Needed</label>
            <select
              value={formData.bloodType}
              onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
              required
            >
              {bloodTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
              min="1"
              max="120"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              rows="3"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn btn-danger" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register as Receiver'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Want to donate? <Link to="/register-donor" style={{ color: '#667eea' }}>Register as Donor</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterReceiver;
