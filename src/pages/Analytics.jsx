import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Analytics({ user }) {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchAnalytics();
  }, [user.role, navigate]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [donationsRes, usersRes] = await Promise.all([
        api.get('/donations/all'),
        api.get('/reports/users?role=all')
      ]);

      const donations = donationsRes.data;
      const users = usersRes.data;

      // Blood group analysis
      const bloodGroupStats = {};
      const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      
      bloodTypes.forEach(type => {
        bloodGroupStats[type] = {
          donated: 0,
          donatedUnits: 0,
          received: 0,
          receivedUnits: 0
        };
      });

      donations.forEach(d => {
        if (bloodGroupStats[d.bloodType]) {
          if (d.status === 'donated') {
            bloodGroupStats[d.bloodType].donated += 1;
            bloodGroupStats[d.bloodType].donatedUnits += d.quantity;
          } else if (d.status === 'received') {
            bloodGroupStats[d.bloodType].received += 1;
            bloodGroupStats[d.bloodType].receivedUnits += d.quantity;
          }
        }
      });

      // Convert to array for charts
      const bloodGroupArray = Object.entries(bloodGroupStats).map(([type, stats]) => ({
        bloodType: type,
        donated: stats.donated,
        donatedUnits: stats.donatedUnits,
        received: stats.received,
        receivedUnits: stats.receivedUnits,
        total: stats.donated + stats.received
      }));

      // Donations vs Requests
      const donatedCount = donations.filter(d => d.status === 'donated').length;
      const receivedCount = donations.filter(d => d.status === 'received').length;
      const donatedUnits = donations.filter(d => d.status === 'donated').reduce((sum, d) => sum + d.quantity, 0);
      const receivedUnits = donations.filter(d => d.status === 'received').reduce((sum, d) => sum + d.quantity, 0);

      setAnalyticsData({
        bloodGroupStats: bloodGroupArray,
        donationsVsRequests: [
          { name: 'Donations', count: donatedCount, units: donatedUnits },
          { name: 'Requests', count: receivedCount, units: receivedUnits }
        ],
        pieData: [
          { name: 'Donated', value: donatedCount, color: '#28a745' },
          { name: 'Received', value: receivedCount, color: '#dc3545' }
        ],
        totalDonations: donatedCount,
        totalRequests: receivedCount,
        totalUnits: donatedUnits + receivedUnits,
        users: users.stats
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  const COLORS = ['#dc3545', '#28a745', '#ffc107', '#17a2b8', '#6f42c1', '#fd7e14', '#20c997', '#e83e8c'];

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '30px' }}>📊 Blood Bank Analytics</h1>

      {/* Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3 style={{ color: '#28a745' }}>{analyticsData.totalDonations}</h3>
          <p>Total Donations</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: '#dc3545' }}>{analyticsData.totalRequests}</h3>
          <p>Total Requests</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: '#667eea' }}>{analyticsData.totalUnits} ml</h3>
          <p>Total Blood Units</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: '#ffc107' }}>{analyticsData.users.total}</h3>
          <p>Registered Users</p>
        </div>
      </div>

      {/* Donations vs Requests - Bar Chart */}
      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>📊 Donations vs Requests Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.donationsVsRequests}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#dc3545" name="Count" />
            <Bar dataKey="units" fill="#28a745" name="Units (ml)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donations vs Requests - Pie Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>🥧 Donations vs Requests Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#28a745', borderRadius: '4px' }}></div>
              <span>Donated: {analyticsData.totalDonations}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#dc3545', borderRadius: '4px' }}></div>
              <span>Received: {analyticsData.totalRequests}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '20px' }}>👥 User Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Donors', value: analyticsData.users.donors, color: '#dc3545' },
                  { name: 'Receivers', value: analyticsData.users.receivers, color: '#c31432' },
                  { name: 'Admins', value: analyticsData.users.admins, color: '#28a745' }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { color: '#dc3545' },
                  { color: '#c31432' },
                  { color: '#28a745' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#dc3545', borderRadius: '4px' }}></div>
              <span>Donors: {analyticsData.users.donors}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#c31432', borderRadius: '4px' }}></div>
              <span>Receivers: {analyticsData.users.receivers}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '20px', height: '20px', background: '#28a745', borderRadius: '4px' }}></div>
              <span>Admins: {analyticsData.users.admins}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Group Analysis - Bar Chart */}
      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>🩸 Blood Group Donations Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData.bloodGroupStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bloodType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="donated" fill="#28a745" name="Donations Count" />
            <Bar dataKey="received" fill="#dc3545" name="Requests Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Blood Group Units Analysis - Bar Chart */}
      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>💉 Blood Group Units (ml) Analysis</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData.bloodGroupStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bloodType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="donatedUnits" fill="#28a745" name="Donated Units (ml)" />
            <Bar dataKey="receivedUnits" fill="#dc3545" name="Received Units (ml)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Blood Group Distribution - Pie Chart */}
      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>🎯 Blood Group Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={analyticsData.bloodGroupStats.filter(bg => bg.total > 0)}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ bloodType, total }) => `${bloodType}: ${total}`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="total"
            >
              {analyticsData.bloodGroupStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Blood Group Table */}
      <div className="card">
        <h2 style={{ marginBottom: '20px' }}>📋 Detailed Blood Group Statistics</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Blood Type</th>
                <th>Donations</th>
                <th>Donated Units (ml)</th>
                <th>Requests</th>
                <th>Received Units (ml)</th>
                <th>Total Transactions</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.bloodGroupStats.map((bg) => (
                <tr key={bg.bloodType}>
                  <td>
                    <strong style={{ 
                      background: '#fff3cd', 
                      color: '#856404', 
                      padding: '4px 12px', 
                      borderRadius: '8px',
                      fontWeight: '600'
                    }}>
                      {bg.bloodType}
                    </strong>
                  </td>
                  <td style={{ color: '#28a745', fontWeight: '600' }}>{bg.donated}</td>
                  <td style={{ color: '#28a745' }}>{bg.donatedUnits} ml</td>
                  <td style={{ color: '#dc3545', fontWeight: '600' }}>{bg.received}</td>
                  <td style={{ color: '#dc3545' }}>{bg.receivedUnits} ml</td>
                  <td><strong>{bg.total}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
