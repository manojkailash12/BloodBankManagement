import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container" style={{ maxWidth: '1000px', marginTop: '50px' }}>
      <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#667eea' }}>
          🩸 Blood Bank Management System
        </h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '50px' }}>
          Connecting donors with those in need. Save lives, donate blood.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' }}>
          <Link to="/login">
            <button className="btn btn-primary" style={{ fontSize: '18px', padding: '15px 40px' }}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="btn btn-success" style={{ fontSize: '18px', padding: '15px 40px' }}>
              Register
            </button>
          </Link>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px',
          marginTop: '60px',
          textAlign: 'left'
        }}>
          <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🩸</div>
            <h3 style={{ color: '#667eea', marginBottom: '10px' }}>For Donors</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Register as a donor to help save lives. Track your donations and make a difference in your community.
            </p>
          </div>

          <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏥</div>
            <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>For Receivers</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Register to request blood when needed. Get connected with available donors quickly and safely.
            </p>
          </div>

          <div style={{ padding: '30px', background: '#f8f9fa', borderRadius: '12px' }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>👨‍💼</div>
            <h3 style={{ color: '#28a745', marginBottom: '10px' }}>For Admins</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Manage blood bank operations, generate reports, and oversee the entire donation process.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '60px', padding: '30px', background: '#fff3cd', borderRadius: '12px' }}>
          <h3 style={{ color: '#856404', marginBottom: '15px' }}>Why Donate Blood?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>❤️</div>
              <p style={{ color: '#856404', fontWeight: '600' }}>Save Lives</p>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🏥</div>
              <p style={{ color: '#856404', fontWeight: '600' }}>Help Patients</p>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌟</div>
              <p style={{ color: '#856404', fontWeight: '600' }}>Be a Hero</p>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🤝</div>
              <p style={{ color: '#856404', fontWeight: '600' }}>Community Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
