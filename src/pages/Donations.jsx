import { useState, useEffect } from 'react';
import api from '../utils/api';

function Donations({ user }) {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bloodType: user.bloodType,
    quantity: '',
    status: 'donated',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const { data } = await api.get(user.role === 'admin' ? '/donations/all' : '/donations');
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/donations', formData);
      setSuccess('Donation recorded successfully!');
      setFormData({ bloodType: user.bloodType, quantity: '', status: 'donated', notes: '' });
      setShowForm(false);
      fetchDonations();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to record donation');
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: 'white' }}>Donations</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-success"
        >
          {showForm ? 'Cancel' : '+ Record Donation'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>Record New Donation</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Blood Type</label>
              <select
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                required
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity (ml)</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                min="100"
                max="500"
                step="50"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="donated">Donated</option>
                <option value="received">Received</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="3"
              />
            </div>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <button type="submit" className="btn btn-primary">Record Donation</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Donation History</h2>
        {donations.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                {user.role === 'admin' && <th>Donor</th>}
                <th>Blood Type</th>
                <th>Quantity (ml)</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                  {user.role === 'admin' && <td>{donation.donor?.name}</td>}
                  <td>{donation.bloodType}</td>
                  <td>{donation.quantity}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: donation.status === 'donated' ? '#d4edda' : '#fff3cd',
                      color: donation.status === 'donated' ? '#155724' : '#856404'
                    }}>
                      {donation.status}
                    </span>
                  </td>
                  <td>{donation.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>No donations recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Donations;
