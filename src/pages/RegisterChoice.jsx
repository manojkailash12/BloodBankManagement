import { Link } from 'react-router-dom';

function RegisterChoice() {
  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '80px' }}>
      <div className="card">
        <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#667eea' }}>
          Choose Registration Type
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '40px', color: '#666', fontSize: '18px' }}>
          Select how you want to register with our Blood Bank Management System
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <Link to="/register-donor" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '40px',
              border: '2px solid #667eea',
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🩸</div>
              <h2 style={{ marginBottom: '10px' }}>Blood Donor</h2>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Register to donate blood and help save lives
              </p>
            </div>
          </Link>

          <Link to="/register-receiver" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '40px',
              border: '2px solid #dc3545',
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
              color: 'white'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏥</div>
              <h2 style={{ marginBottom: '10px' }}>Blood Receiver</h2>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Register to request blood when needed
              </p>
            </div>
          </Link>

          <Link to="/register-admin" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '40px',
              border: '2px solid #28a745',
              borderRadius: '12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
              color: 'white'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>👨‍💼</div>
              <h2 style={{ marginBottom: '10px' }}>Administrator</h2>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Manage blood bank operations and reports
              </p>
            </div>
          </Link>
        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '16px' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: '600' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterChoice;
