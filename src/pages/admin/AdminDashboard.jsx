import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/useAuth';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const usersRes = await api.get('/admin/users');
      setUsers(usersRes.data);
      const pendingRes = await api.get('/admin/payments/pending');
      setPendingPayments(pendingRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAccept = async (paymentId) => {
    try {
      await api.put('/admin/payments/' + paymentId + '/accept');
      setActionMessage('Payment accepted!');
      fetchData();
    } catch (err) {
      console.error(err);
      setActionMessage('Failed to accept payment');
    }
  };

  const handleReject = async (paymentId) => {
    const remark = window.prompt('Reason for rejection (optional):');
    try {
      await api.put('/admin/payments/' + paymentId + '/reject', { remark: remark || '' });
      setActionMessage('Payment rejected!');
      fetchData();
    } catch (err) {
      console.error(err);
      setActionMessage('Failed to reject payment');
    }
  };

  const getRoleBadgeClass = (role) => {
    if (role === 'ADMIN') {
      return 'badge badge-accepted';
    }
    return 'badge badge-pending';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="admin-page-container">
      <div className="dashboard-container">

        <div className="card-header">
          <h2>Admin Dashboard</h2>
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>

        {actionMessage ? (
          <p style={{ color: '#16a34a', fontWeight: 600, marginBottom: '15px' }}>
            {actionMessage}
          </p>
        ) : null}

        <div className="stats-row">
          <div className="stat-card">
            <p className="stat-number">{users.length}</p>
            <p className="stat-label">Total Users</p>
          </div>
          <div className="stat-card">
            <p className="stat-number">{pendingPayments.length}</p>
            <p className="stat-label">Pending Payments</p>
          </div>
        </div>

        <h3>All Users</h3>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Pending</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={getRoleBadgeClass(u.role)}>{u.role}</span>
                    </td>
                    <td>{u.pendingCount}</td>
                    <td>{u.completedCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h3>Pending Payments</h3>

        {pendingPayments.length === 0 ? (
          <p className="text-muted">No pending payments.</p>
        ) : null}

        {pendingPayments.map((payment) => {
          const screenshotUrl = 'http://localhost:8080/uploads/' + payment.screenshotPath;
          return (
            <div key={payment.id} className="card">
              <div className="card-header">
                <div>
                  <p><strong>{payment.user.name}</strong></p>
                  <p className="text-muted" style={{ fontSize: '13px' }}>{payment.user.email}</p>
                </div>
                <span className="badge badge-pending">PENDING</span>
              </div>

              <p style={{ margin: '10px 0' }}>
                {payment.month} - <strong>Rs.{payment.amount}</strong>
              </p>

              <p style={{ marginBottom: '15px' }}>
                <a href={screenshotUrl} target="_blank" rel="noreferrer">
                  View Screenshot
                </a>
              </p>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-success" onClick={() => handleAccept(payment.id)}>
                  Accept
                </button>
                <button className="btn btn-danger" onClick={() => handleReject(payment.id)}>
                  Reject
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default AdminDashboard;