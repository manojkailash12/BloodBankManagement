import { Link } from 'react-router-dom';

function RegisterChoice() {
  return (
    <div className="container" style={{ maxWidth: '1000px', marginTop: '50px' }}>
      <div className="card" style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '48px', 
          marginBottom: '15px', 
          color: '#dc3545',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '2px'
        }}>
          🩸 BLOOD BANK MANAGEMENT
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#666', 
          marginBottom: '50px',
          fontStyle: 'italic'
        }}>
          A drop of blood could save a life
        </p>

        <h2 style={{ 
          fontSize: '32px', 
          marginBottom: '40px', 
          color: '#333',
          fontWeight: '600'
        }}>
          Choose Your Registration Type
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px',
          marginBottom: '50px'
        }}>
          <Link to="/register-donor" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '50px 30px',
              border: '3px solid #dc3545',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, #dc3545 0%, #c31432 100%)',
              color: 'white',
              boxShadow: '0 8px 20px rgba(220, 53, 69, 0.3)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(220, 53, 69, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 53, 69, 0.3)';
            }}
            >
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🩸</div>
              <h2 style={{ marginBottom: '15px', fontSize: '28px', color: 'white' }}>Blood Donor</h2>
              <p style={{ fontSize: '16px', opacity: 0.95, lineHeight: '1.6' }}>
                Register to donate blood and help save lives in your community
              </p>
            </div>
          </Link>

          <Link to="/register-receiver" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '50px 30px',
              border: '3px solid #c31432',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, #c31432 0%, #8b0000 100%)',
              color: 'white',
              boxShadow: '0 8px 20px rgba(195, 20, 50, 0.3)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(195, 20, 50, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(195, 20, 50, 0.3)';
            }}
            >
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏥</div>
              <h2 style={{ marginBottom: '15px', fontSize: '28px', color: 'white' }}>Blood Receiver</h2>
              <p style={{ fontSize: '16px', opacity: 0.95, lineHeight: '1.6' }}>
                Register to request blood when you or your loved ones need it
              </p>
            </div>
          </Link>

          <Link to="/register-admin" style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '50px 30px',
              border: '3px solid #28a745',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
              color: 'white',
              boxShadow: '0 8px 20px rgba(40, 167, 69, 0.3)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(40, 167, 69, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(40, 167, 69, 0.3)';
            }}
            >
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>👨‍💼</div>
              <h2 style={{ marginBottom: '15px', fontSize: '28px', color: 'white' }}>Administrator</h2>
              <p style={{ fontSize: '16px', opacity: 0.95, lineHeight: '1.6' }}>
                Manage blood bank operations, reports, and oversee the system
              </p>
            </div>
          </Link>
        </div>

        <div style={{ 
          padding: '30px', 
          background: 'rgba(220, 53, 69, 0.1)', 
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '18px', color: '#333', margin: 0 }}>
            Already have an account? 
            <Link to="/login" style={{ 
              color: '#dc3545', 
              fontWeight: '700',
              marginLeft: '10px',
              textDecoration: 'none',
              borderBottom: '2px solid #dc3545'
            }}>
              Login Here
            </Link>
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '40px',
          flexWrap: 'wrap',
          marginTop: '40px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>❤️</div>
            <p style={{ color: '#666', fontWeight: '600' }}>Save Lives</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏥</div>
            <p style={{ color: '#666', fontWeight: '600' }}>Help Patients</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🌟</div>
            <p style={{ color: '#666', fontWeight: '600' }}>Be a Hero</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>🤝</div>
            <p style={{ color: '#666', fontWeight: '600' }}>Community Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterChoice;
