import { useState, useEffect } from 'react';
import api from '../utils/api';

function Dashboard({ user }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      if (user.role === 'admin') {
        // Admin gets all data
        const [donationsRes, usersRes] = await Promise.all([
          api.get('/donations/all'),
          api.get('/reports/users?role=all')
        ]);
        
        const donations = donationsRes.data;
        const users = usersRes.data;
        
        const totalDonated = donations.filter(d => d.status === 'donated').reduce((sum, d) => sum + d.quantity, 0);
        const totalReceived = donations.filter(d => d.status === 'received').reduce((sum, d) => sum + d.quantity, 0);
        
        setStats({
          totalDonations: donations.filter(d => d.status === 'donated').length,
          totalReceived: donations.filter(d => d.status === 'received').length,
          totalDonated,
          totalReceivedQty: totalReceived,
          recentDonations: donations.slice(0, 5),
          totalUsers: users.stats.total,
          totalDonors: users.stats.donors,
          totalReceivers: users.stats.receivers,
          totalAdmins: users.stats.admins
        });
      } else {
        // Regular users get their own data
        const { data } = await api.get('/donations');
        const totalDonated = data.filter(d => d.status === 'donated').reduce((sum, d) => sum + d.quantity, 0);
        const totalReceived = data.filter(d => d.status === 'received').reduce((sum, d) => sum + d.quantity, 0);
        
        setStats({
          totalDonations: data.filter(d => d.status === 'donated').length,
          totalDonated,
          totalReceived,
          recentDonations: data.slice(0, 5)
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;

  const getRoleDisplay = () => {
    console.log('User role:', user.role); // Debug log
    switch(user.role) {
      case 'donor': return { icon: '🩸', text: 'Blood Donor', color: '#dc3545' };
      case 'receiver': return { icon: '🏥', text: 'Blood Receiver', color: '#c31432' };
      case 'admin': return { icon: '👨‍💼', text: 'Administrator', color: '#28a745' };
      default: return { icon: '👤', text: 'User', color: '#dc3545' };
    }
  };

  const roleInfo = getRoleDisplay();

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Welcome, {user.name}!</h1>
        <span style={{ 
          background: 'white', 
          padding: '8px 16px', 
          borderRadius: '20px',
          color: roleInfo.color,
          fontWeight: '600',
          fontSize: '14px'
        }}>
          {roleInfo.icon} {roleInfo.text}
        </span>
      </div>
      
      {user.role === 'admin' ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3 style={{ color: '#28a745' }}>{stats?.totalUsers || 0}</h3>
              <p>Total Registered Users</p>
            </div>
            <div className="stat-card">
              <h3 style={{ color: '#dc3545' }}>{stats?.totalDonors || 0}</h3>
              <p>Blood Donors</p>
            </div>
            <div className="stat-card">
              <h3 style={{ color: '#c31432' }}>{stats?.totalReceivers || 0}</h3>
              <p>Blood Receivers</p>
            </div>
            <div className="stat-card">
              <h3 style={{ color: '#667eea' }}>{stats?.totalAdmins || 0}</h3>
              <p>Administrators</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats?.totalDonations || 0}</h3>
              <p>Total Donations</p>
            </div>
            <div className="stat-card">
              <h3>{stats?.totalDonated || 0} ml</h3>
              <p>Blood Donated</p>
            </div>
            <div className="stat-card">
              <h3>{stats?.totalReceived || 0}</h3>
              <p>Blood Received Count</p>
            </div>
            <div className="stat-card">
              <h3>{stats?.totalReceivedQty || 0} ml</h3>
              <p>Blood Received Quantity</p>
            </div>
          </div>
        </>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats?.totalDonations || 0}</h3>
            <p>Total Donations</p>
          </div>
          <div className="stat-card">
            <h3>{stats?.totalDonated || 0} ml</h3>
            <p>Blood Donated</p>
          </div>
          <div className="stat-card">
            <h3>{stats?.totalReceived || 0} ml</h3>
            <p>Blood Received</p>
          </div>
          <div className="stat-card">
            <h3>{user.bloodType}</h3>
            <p>Your Blood Type</p>
          </div>
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>Recent Activity</h2>
        {stats?.recentDonations?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                {user.role === 'admin' && <th>Donor</th>}
                <th>Blood Type</th>
                <th>Quantity (ml)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentDonations.map((donation) => (
                <tr key={donation._id}>
                  <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
                  {user.role === 'admin' && <td>{donation.donor?.name || 'N/A'}</td>}
                  <td><strong>{donation.bloodType}</strong></td>
                  <td>{donation.quantity}</td>
                  <td>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: donation.status === 'donated' ? '#d4edda' : '#fff3cd',
                      color: donation.status === 'donated' ? '#155724' : '#856404',
                      fontWeight: '600'
                    }}>
                      {donation.status === 'donated' ? '🩸 DONATED' : '🏥 RECEIVED'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', color: '#666' }}>
            {user.role === 'admin' 
              ? 'No donations recorded yet in the system.' 
              : 'No donations yet. Start donating to save lives!'}
          </p>
        )}
      </div>

      {user.role === 'admin' && (
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '15px', color: 'white' }}>👨‍💼 Admin Access</h2>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            You have full administrative access to manage the blood bank system
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>📊</div>
              <div style={{ fontSize: '14px' }}>View All Donations</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>👥</div>
              <div style={{ fontSize: '14px' }}>Manage Users</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>📈</div>
              <div style={{ fontSize: '14px' }}>Generate Reports</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>📄</div>
              <div style={{ fontSize: '14px' }}>Export Data</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
