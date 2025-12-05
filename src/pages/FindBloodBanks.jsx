import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red icon for blood banks
const bloodBankIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom blue icon for user location
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function FindBloodBanks() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchRadius, setSearchRadius] = useState(5000); // 5km default

  // Sample blood banks data (in real app, this would come from API)
  const bloodBanks = [
    {
      id: 1,
      name: 'City General Hospital Blood Bank',
      lat: 13.0827,
      lng: 80.2707,
      phone: '+91-44-1234-5678',
      address: 'Anna Salai, Chennai',
      hours: '24/7',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    {
      id: 2,
      name: 'Red Cross Blood Bank',
      lat: 13.0878,
      lng: 80.2785,
      phone: '+91-44-2345-6789',
      address: 'T Nagar, Chennai',
      hours: '8 AM - 8 PM',
      bloodTypes: ['A+', 'B+', 'O+', 'AB+']
    },
    {
      id: 3,
      name: 'Apollo Hospital Blood Bank',
      lat: 13.0569,
      lng: 80.2425,
      phone: '+91-44-3456-7890',
      address: 'Greams Road, Chennai',
      hours: '24/7',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    {
      id: 4,
      name: 'Government Hospital Blood Bank',
      lat: 13.0915,
      lng: 80.2615,
      phone: '+91-44-4567-8901',
      address: 'Kilpauk, Chennai',
      hours: '24/7',
      bloodTypes: ['A+', 'B+', 'O+', 'AB+', 'O-']
    },
    {
      id: 5,
      name: 'Fortis Malar Hospital Blood Bank',
      lat: 13.0358,
      lng: 80.2464,
      phone: '+91-44-5678-9012',
      address: 'Adyar, Chennai',
      hours: '24/7',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    }
  ];

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      // Default to Chennai, India
      setUserLocation({ lat: 13.0827, lng: 80.2707 });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to get your location. Showing default location (Chennai).');
        // Default to Chennai, India
        setUserLocation({ lat: 13.0827, lng: 80.2707 });
        setLoading(false);
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const getDirections = (lat, lng) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  if (loading) {
    return (
      <div className="container">
        <h1 style={{ color: 'white', marginBottom: '30px' }}>🗺️ Find Nearby Blood Banks</h1>
        <div className="card">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>📍</div>
            <p>Getting your location...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '30px' }}>🗺️ Find Nearby Blood Banks</h1>
      
      {error && (
        <div className="card" style={{ background: '#fff3cd', borderColor: '#ffc107', marginBottom: '20px' }}>
          <p style={{ margin: 0, color: '#856404' }}>⚠️ {error}</p>
        </div>
      )}

      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ margin: 0, marginBottom: '5px' }}>Your Location</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              📍 Lat: {userLocation?.lat.toFixed(4)}, Lng: {userLocation?.lng.toFixed(4)}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label style={{ fontSize: '14px', color: '#666' }}>Search Radius:</label>
            <select 
              value={searchRadius} 
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              style={{ padding: '8px 12px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              <option value={2000}>2 km</option>
              <option value={5000}>5 km</option>
              <option value={10000}>10 km</option>
              <option value={20000}>20 km</option>
            </select>
            <button onClick={getUserLocation} className="btn btn-primary">
              🔄 Refresh Location
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '20px' }}>
        <div style={{ height: '500px', width: '100%' }}>
          {userLocation && (
            <MapContainer 
              center={[userLocation.lat, userLocation.lng]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* User location marker */}
              <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                <Popup>
                  <strong>📍 Your Location</strong>
                </Popup>
              </Marker>

              {/* Search radius circle */}
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={searchRadius}
                pathOptions={{ color: '#667eea', fillColor: '#667eea', fillOpacity: 0.1 }}
              />

              {/* Blood bank markers */}
              {bloodBanks.map((bank) => {
                const distance = calculateDistance(
                  userLocation.lat, 
                  userLocation.lng, 
                  bank.lat, 
                  bank.lng
                );
                
                return (
                  <Marker key={bank.id} position={[bank.lat, bank.lng]} icon={bloodBankIcon}>
                    <Popup>
                      <div style={{ minWidth: '200px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>🏥 {bank.name}</h3>
                        <p style={{ margin: '5px 0', fontSize: '13px' }}>
                          <strong>📍 Distance:</strong> {distance} km
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '13px' }}>
                          <strong>📞 Phone:</strong> <a href={`tel:${bank.phone}`}>{bank.phone}</a>
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '13px' }}>
                          <strong>📍 Address:</strong> {bank.address}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '13px' }}>
                          <strong>🕐 Hours:</strong> {bank.hours}
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '13px' }}>
                          <strong>🩸 Available:</strong> {bank.bloodTypes.join(', ')}
                        </p>
                        <button 
                          onClick={() => getDirections(bank.lat, bank.lng)}
                          style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '100%'
                          }}
                        >
                          🗺️ Get Directions
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>📋 Nearby Blood Banks</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {bloodBanks.map((bank) => {
            const distance = userLocation ? calculateDistance(
              userLocation.lat, 
              userLocation.lng, 
              bank.lat, 
              bank.lng
            ) : 'N/A';

            return (
              <div 
                key={bank.id}
                style={{
                  padding: '20px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '12px',
                  background: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>🏥 {bank.name}</h3>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>📍 Distance:</strong> {distance} km away
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>📞 Phone:</strong> <a href={`tel:${bank.phone}`} style={{ color: '#667eea' }}>{bank.phone}</a>
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>📍 Address:</strong> {bank.address}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>🕐 Hours:</strong> {bank.hours}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>🩸 Blood Types Available:</strong>
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {bank.bloodTypes.map((type) => (
                        <span 
                          key={type}
                          style={{
                            padding: '4px 12px',
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button 
                      onClick={() => getDirections(bank.lat, bank.lng)}
                      className="btn btn-primary"
                    >
                      🗺️ Get Directions
                    </button>
                    <a 
                      href={`tel:${bank.phone}`}
                      className="btn btn-success"
                      style={{ textAlign: 'center', textDecoration: 'none' }}
                    >
                      📞 Call Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ background: '#e7f3ff', borderColor: '#2196F3' }}>
        <h3 style={{ color: '#1976D2', marginBottom: '15px' }}>💡 Tips:</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: '2' }}>
          <li>Click on red markers to see blood bank details</li>
          <li>Blue marker shows your current location</li>
          <li>Adjust search radius to find more blood banks</li>
          <li>Click "Get Directions" to navigate using Google Maps</li>
          <li>Call blood banks directly to check blood availability</li>
        </ul>
      </div>
    </div>
  );
}

export default FindBloodBanks;
