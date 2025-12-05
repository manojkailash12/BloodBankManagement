import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { format } from 'date-fns';

function Users({ user }) {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [filter, user.role, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/reports/users?role=${filter}`);
      setUsers(data.users);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user.role !== 'admin') {
    return null;
  }

  const getRoleBadge = (role) => {
    const styles = {
      donor: { bg: '#e7e7ff', color: '#667eea', icon: '🩸', text: 'DONOR' },
      receiver: { bg: '#ffe7e7', color: '#dc3545', icon: '🏥', text: 'RECEIVER' },
      admin: { bg: '#e7ffe7', color: '#28a745', icon: '👨‍💼', text: 'ADMIN' }
    };
    const style = styles[role] || styles.donor;
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        background: style.bg,
        color: style.color,
        fontWeight: '600',
        fontSize: '12px'
      }}>
        {style.icon} {style.text}
      </span>
    );
  };

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '30px' }}>👥 User Management</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3 style={{ color: '#28a745' }}>{stats?.total || 0}</h3>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: '#dc3545' }}>{stats?.donors || 0}</h3>
          <p>Donors</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: '#c31432' }}>{stats?.receivers || 0}</h3>
          <p>Receivers</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: '#667eea' }}>{stats?.admins || 0}</h3>
          <p>Admins</p>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <h2 style={{ margin: 0 }}>Registered Users</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '8px 16px' }}
            >
              All Users
            </button>
            <button
              onClick={() => setFilter('donor')}
              className={filter === 'donor' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '8px 16px' }}
            >
              🩸 Donors
            </button>
            <button
              onClick={() => setFilter('receiver')}
              className={filter === 'receiver' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '8px 16px' }}
            >
              🏥 Receivers
            </button>
            <button
              onClick={() => setFilter('admin')}
              className={filter === 'admin' ? 'btn btn-primary' : 'btn btn-secondary'}
              style={{ padding: '8px 16px' }}
            >
              👨‍💼 Admins
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading users...</p>
        ) : users.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Blood Type</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td>{getRoleBadge(u.role)}</td>
                    <td>
                      <span style={{
                        background: '#fff3cd',
                        color: '#856404',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontWeight: '600'
                      }}>
                        {u.bloodType}
                      </span>
                    </td>
                    <td>{u.phone}</td>
                    <td>{u.age}</td>
                    <td>{format(new Date(u.createdAt), 'MMM dd, yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            No users found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
}

export default Users;
