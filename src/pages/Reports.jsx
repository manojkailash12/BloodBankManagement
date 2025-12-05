import { useState, useEffect } from 'react';
import api from '../utils/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

function Reports({ user }) {
  const [reportData, setReportData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');

  useEffect(() => {
    if (activeTab === 'daily') {
      fetchReport();
    } else if (activeTab === 'users') {
      fetchUsers();
    }
  }, [selectedDate, activeTab]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/reports/daily?date=${selectedDate}`);
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/reports/users?role=all');
      setUsersData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Blood Bank Daily Report', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Date: ${format(new Date(selectedDate), 'MMMM dd, yyyy')}`, 14, 30);
    
    doc.setFontSize(14);
    doc.text('Summary Statistics', 14, 45);
    
    const summaryData = [
      ['Total Donations', reportData.donations.count],
      ['Blood Donated (ml)', reportData.donations.total],
      ['Total Received', reportData.received.count],
      ['Blood Received (ml)', reportData.received.total],
      ['Total Registered Users', reportData.registrations.total],
      ['New Registrations Today', reportData.registrations.today]
    ];
    
    doc.autoTable({
      startY: 50,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid'
    });
    
    if (Object.keys(reportData.bloodTypeStats).length > 0) {
      doc.text('Blood Type Statistics', 14, doc.lastAutoTable.finalY + 15);
      
      const bloodTypeData = Object.entries(reportData.bloodTypeStats).map(([type, stats]) => [
        type,
        stats.count,
        stats.donated
      ]);
      
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 20,
        head: [['Blood Type', 'Donations', 'Total (ml)']],
        body: bloodTypeData,
        theme: 'grid'
      });
    }
    
    if (reportData.donations.details.length > 0) {
      doc.addPage();
      doc.text('Donation Details', 14, 20);
      
      const donationDetails = reportData.donations.details.map(d => [
        d.donor.name,
        d.bloodType,
        d.quantity,
        format(new Date(d.donationDate), 'HH:mm')
      ]);
      
      doc.autoTable({
        startY: 25,
        head: [['Donor Name', 'Blood Type', 'Quantity (ml)', 'Time']],
        body: donationDetails,
        theme: 'striped'
      });
    }
    
    doc.save(`blood-bank-report-${selectedDate}.pdf`);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const summaryData = [
      ['Blood Bank Daily Report'],
      [`Date: ${format(new Date(selectedDate), 'MMMM dd, yyyy')}`],
      [],
      ['Metric', 'Value'],
      ['Total Donations', reportData.donations.count],
      ['Blood Donated (ml)', reportData.donations.total],
      ['Total Received', reportData.received.count],
      ['Blood Received (ml)', reportData.received.total],
      ['Total Registered Users', reportData.registrations.total],
      ['New Registrations Today', reportData.registrations.today]
    ];
    
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary');
    
    if (reportData.donations.details.length > 0) {
      const donationData = reportData.donations.details.map(d => ({
        'Donor Name': d.donor.name,
        'Email': d.donor.email,
        'Blood Type': d.bloodType,
        'Quantity (ml)': d.quantity,
        'Date': format(new Date(d.donationDate), 'yyyy-MM-dd'),
        'Time': format(new Date(d.donationDate), 'HH:mm'),
        'Notes': d.notes || ''
      }));
      
      const ws2 = XLSX.utils.json_to_sheet(donationData);
      XLSX.utils.book_append_sheet(wb, ws2, 'Donations');
    }
    
    if (Object.keys(reportData.bloodTypeStats).length > 0) {
      const bloodTypeData = Object.entries(reportData.bloodTypeStats).map(([type, stats]) => ({
        'Blood Type': type,
        'Number of Donations': stats.count,
        'Total Donated (ml)': stats.donated
      }));
      
      const ws3 = XLSX.utils.json_to_sheet(bloodTypeData);
      XLSX.utils.book_append_sheet(wb, ws3, 'Blood Type Stats');
    }
    
    XLSX.writeFile(wb, `blood-bank-report-${selectedDate}.xlsx`);
  };

  if (user.role !== 'admin') {
    return (
      <div className="container">
        <div className="card">
          <h2>Access Denied</h2>
          <p>Only administrators can access reports.</p>
        </div>
      </div>
    );
  }

  const exportDonorsPDF = () => {
    const donors = usersData.users.filter(u => u.role === 'donor');
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Blood Donors Report', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}`, 14, 30);
    doc.text(`Total Donors: ${donors.length}`, 14, 38);
    
    const donorData = donors.map(d => [
      d.name,
      d.email,
      d.bloodType,
      d.phone,
      d.age,
      format(new Date(d.createdAt), 'yyyy-MM-dd')
    ]);
    
    doc.autoTable({
      startY: 45,
      head: [['Name', 'Email', 'Blood Type', 'Phone', 'Age', 'Registered']],
      body: donorData,
      theme: 'striped'
    });
    
    doc.save(`donors-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  const exportReceiversPDF = () => {
    const receivers = usersData.users.filter(u => u.role === 'receiver');
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Blood Receivers Report', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}`, 14, 30);
    doc.text(`Total Receivers: ${receivers.length}`, 14, 38);
    
    const receiverData = receivers.map(d => [
      d.name,
      d.email,
      d.bloodType,
      d.phone,
      d.age,
      format(new Date(d.createdAt), 'yyyy-MM-dd')
    ]);
    
    doc.autoTable({
      startY: 45,
      head: [['Name', 'Email', 'Blood Type', 'Phone', 'Age', 'Registered']],
      body: receiverData,
      theme: 'striped'
    });
    
    doc.save(`receivers-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  const exportDonorsExcel = () => {
    const donors = usersData.users.filter(u => u.role === 'donor');
    const wb = XLSX.utils.book_new();
    
    const donorData = donors.map(d => ({
      'Name': d.name,
      'Email': d.email,
      'Blood Type': d.bloodType,
      'Phone': d.phone,
      'Age': d.age,
      'Address': d.address,
      'Registered Date': format(new Date(d.createdAt), 'yyyy-MM-dd')
    }));
    
    const ws = XLSX.utils.json_to_sheet(donorData);
    XLSX.utils.book_append_sheet(wb, ws, 'Donors');
    
    XLSX.writeFile(wb, `donors-report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const exportReceiversExcel = () => {
    const receivers = usersData.users.filter(u => u.role === 'receiver');
    const wb = XLSX.utils.book_new();
    
    const receiverData = receivers.map(d => ({
      'Name': d.name,
      'Email': d.email,
      'Blood Type Needed': d.bloodType,
      'Phone': d.phone,
      'Age': d.age,
      'Address': d.address,
      'Registered Date': format(new Date(d.createdAt), 'yyyy-MM-dd')
    }));
    
    const ws = XLSX.utils.json_to_sheet(receiverData);
    XLSX.utils.book_append_sheet(wb, ws, 'Receivers');
    
    XLSX.writeFile(wb, `receivers-report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  const exportAllUsersPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('All Users Report', 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Generated: ${format(new Date(), 'MMMM dd, yyyy HH:mm')}`, 14, 30);
    doc.text(`Total Users: ${usersData.users.length}`, 14, 38);
    doc.text(`Donors: ${usersData.stats.donors} | Receivers: ${usersData.stats.receivers} | Admins: ${usersData.stats.admins}`, 14, 46);
    
    const userData = usersData.users.map(u => [
      u.name,
      u.email,
      u.role.toUpperCase(),
      u.bloodType,
      u.phone,
      format(new Date(u.createdAt), 'yyyy-MM-dd')
    ]);
    
    doc.autoTable({
      startY: 52,
      head: [['Name', 'Email', 'Role', 'Blood Type', 'Phone', 'Registered']],
      body: userData,
      theme: 'striped'
    });
    
    doc.save(`all-users-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  const exportAllUsersExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // All users sheet
    const allUsersData = usersData.users.map(u => ({
      'Name': u.name,
      'Email': u.email,
      'Role': u.role.toUpperCase(),
      'Blood Type': u.bloodType,
      'Phone': u.phone,
      'Age': u.age,
      'Address': u.address,
      'Registered Date': format(new Date(u.createdAt), 'yyyy-MM-dd')
    }));
    
    const ws1 = XLSX.utils.json_to_sheet(allUsersData);
    XLSX.utils.book_append_sheet(wb, ws1, 'All Users');
    
    // Donors sheet
    const donors = usersData.users.filter(u => u.role === 'donor');
    if (donors.length > 0) {
      const donorData = donors.map(d => ({
        'Name': d.name,
        'Email': d.email,
        'Blood Type': d.bloodType,
        'Phone': d.phone,
        'Age': d.age,
        'Address': d.address,
        'Registered Date': format(new Date(d.createdAt), 'yyyy-MM-dd')
      }));
      const ws2 = XLSX.utils.json_to_sheet(donorData);
      XLSX.utils.book_append_sheet(wb, ws2, 'Donors');
    }
    
    // Receivers sheet
    const receivers = usersData.users.filter(u => u.role === 'receiver');
    if (receivers.length > 0) {
      const receiverData = receivers.map(d => ({
        'Name': d.name,
        'Email': d.email,
        'Blood Type Needed': d.bloodType,
        'Phone': d.phone,
        'Age': d.age,
        'Address': d.address,
        'Registered Date': format(new Date(d.createdAt), 'yyyy-MM-dd')
      }));
      const ws3 = XLSX.utils.json_to_sheet(receiverData);
      XLSX.utils.book_append_sheet(wb, ws3, 'Receivers');
    }
    
    XLSX.writeFile(wb, `complete-users-report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  return (
    <div className="container">
      <h1 style={{ color: 'white', marginBottom: '30px' }}>Admin Reports</h1>
      
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #e0e0e0', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('daily')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'daily' ? '#667eea' : 'transparent',
              color: activeTab === 'daily' ? 'white' : '#666',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0'
            }}
          >
            📊 Daily Reports
          </button>
          <button
            onClick={() => setActiveTab('users')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'users' ? '#667eea' : 'transparent',
              color: activeTab === 'users' ? 'white' : '#666',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0'
            }}
          >
            👥 Users Reports
          </button>
        </div>
      </div>
      
      {activeTab === 'daily' && (
        <>
          <div className="card" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div className="form-group" style={{ marginBottom: 0, flex: '1', minWidth: '200px' }}>
                <label>Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={exportToPDF} className="btn btn-danger" disabled={!reportData}>
                  📄 Export PDF
                </button>
                <button onClick={exportToExcel} className="btn btn-success" disabled={!reportData}>
                  📊 Export Excel
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="card">Loading report...</div>
          ) : reportData ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{reportData.donations.count}</h3>
              <p>Donations Today</p>
            </div>
            <div className="stat-card">
              <h3>{reportData.donations.total} ml</h3>
              <p>Blood Donated</p>
            </div>
            <div className="stat-card">
              <h3>{reportData.received.count}</h3>
              <p>Blood Received</p>
            </div>
            <div className="stat-card">
              <h3>{reportData.received.total} ml</h3>
              <p>Total Received</p>
            </div>
            <div className="stat-card">
              <h3>{reportData.registrations.total}</h3>
              <p>Total Users</p>
            </div>
            <div className="stat-card">
              <h3>{reportData.registrations.today}</h3>
              <p>New Today</p>
            </div>
          </div>

          {Object.keys(reportData.bloodTypeStats).length > 0 && (
            <div className="card">
              <h2 style={{ marginBottom: '20px' }}>Blood Type Statistics</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Blood Type</th>
                    <th>Number of Donations</th>
                    <th>Total Donated (ml)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(reportData.bloodTypeStats).map(([type, stats]) => (
                    <tr key={type}>
                      <td><strong>{type}</strong></td>
                      <td>{stats.count}</td>
                      <td>{stats.donated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="card">
            <h2 style={{ marginBottom: '20px' }}>Donation Details</h2>
            {reportData.donations.details.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Donor Name</th>
                    <th>Blood Type</th>
                    <th>Quantity (ml)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.donations.details.map((donation) => (
                    <tr key={donation._id}>
                      <td>{format(new Date(donation.donationDate), 'HH:mm')}</td>
                      <td>{donation.donor.name}</td>
                      <td>{donation.bloodType}</td>
                      <td>{donation.quantity}</td>
                      <td>{donation.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>No donations recorded for this date.</p>
            )}
          </div>
        </>
      ) : null}
        </>
      )}

      {activeTab === 'users' && (
        <>
          <div className="card" style={{ marginBottom: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Export Users Data</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Export registered donors and receivers data to PDF or Excel format
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ padding: '20px', border: '2px solid #667eea', borderRadius: '12px' }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>🩸 Donors</h3>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                  Export all registered blood donors
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={exportDonorsPDF} className="btn btn-danger" disabled={!usersData}>
                    📄 PDF
                  </button>
                  <button onClick={exportDonorsExcel} className="btn btn-success" disabled={!usersData}>
                    📊 Excel
                  </button>
                </div>
              </div>

              <div style={{ padding: '20px', border: '2px solid #dc3545', borderRadius: '12px' }}>
                <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>🏥 Receivers</h3>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                  Export all registered blood receivers
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={exportReceiversPDF} className="btn btn-danger" disabled={!usersData}>
                    📄 PDF
                  </button>
                  <button onClick={exportReceiversExcel} className="btn btn-success" disabled={!usersData}>
                    📊 Excel
                  </button>
                </div>
              </div>

              <div style={{ padding: '20px', border: '2px solid #28a745', borderRadius: '12px' }}>
                <h3 style={{ color: '#28a745', marginBottom: '15px' }}>👥 All Users</h3>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                  Export complete users database
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={exportAllUsersPDF} className="btn btn-danger" disabled={!usersData}>
                    📄 PDF
                  </button>
                  <button onClick={exportAllUsersExcel} className="btn btn-success" disabled={!usersData}>
                    📊 Excel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="card">Loading users data...</div>
          ) : usersData ? (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>{usersData.stats.total}</h3>
                  <p>Total Users</p>
                </div>
                <div className="stat-card">
                  <h3 style={{ color: '#667eea' }}>{usersData.stats.donors}</h3>
                  <p>Donors</p>
                </div>
                <div className="stat-card">
                  <h3 style={{ color: '#dc3545' }}>{usersData.stats.receivers}</h3>
                  <p>Receivers</p>
                </div>
                <div className="stat-card">
                  <h3 style={{ color: '#28a745' }}>{usersData.stats.admins}</h3>
                  <p>Admins</p>
                </div>
              </div>

              <div className="card">
                <h2 style={{ marginBottom: '20px' }}>All Registered Users</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Blood Type</th>
                      <th>Phone</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            background: user.role === 'donor' ? '#e7e7ff' : user.role === 'receiver' ? '#ffe7e7' : '#e7ffe7',
                            color: user.role === 'donor' ? '#667eea' : user.role === 'receiver' ? '#dc3545' : '#28a745',
                            fontWeight: '600',
                            fontSize: '12px'
                          }}>
                            {user.role === 'donor' ? '🩸 DONOR' : user.role === 'receiver' ? '🏥 RECEIVER' : '👨‍💼 ADMIN'}
                          </span>
                        </td>
                        <td><strong>{user.bloodType}</strong></td>
                        <td>{user.phone}</td>
                        <td>{format(new Date(user.createdAt), 'MMM dd, yyyy')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default Reports;
