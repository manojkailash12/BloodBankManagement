import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 style={{ 
          color: '#dc3545', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          textShadow: '2px 2px 4px rgba(220, 53, 69, 0.2)'
        }}>
          <span style={{ fontSize: '32px' }}>🩸</span> 
          Blood Bank Management
        </h2>
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/donations">Donations</Link>
          <Link to="/find-blood-banks">🗺️ Find Blood Banks</Link>
          {user?.role === 'admin' && (
            <>
              <Link to="/users">👥 Users</Link>
              <Link to="/analytics">📊 Analytics</Link>
              <Link to="/reports" style={{ 
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '600'
              }}>
                📄 Reports
              </Link>
            </>
          )}
          <Link to="/change-password">🔒 Change Password</Link>
          <span style={{ 
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {user?.role === 'admin' && <span style={{ 
              background: '#28a745',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600'
            }}>👨‍💼 ADMIN</span>}
            Welcome, {user?.name}
          </span>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
