import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [rentData, setRentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [month, setMonth] = useState('');
  const [amount, setAmount] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const profileRes = await api.get('/user/profile');
      setProfile(profileRes.data);

      const rentRes = await api.get('/user/rent-history');
      setRentData(rentRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load profile data');
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

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setUploadError('');
    setUploadSuccess('');

    if (!screenshot) {
      setUploadError('Please upload a screenshot');
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append('month', month.trim());
    data.append('amount', amount);
    data.append('screenshot', screenshot);

    try {
      await api.post('/user/rent-payment', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadSuccess('Payment submitted successfully! Waiting for admin approval.');
      setMonth('');
      setAmount('');
      setScreenshot(null);
      document.getElementById('screenshot-input').value = '';

      fetchData();
    } catch (err) {
      console.error(err);
      setUploadError(err.response?.data?.message || 'Payment submission failed');
    } finally {
      setUploading(false);
    }
  };

  const getBadgeClass = (status) => {
    if (status === 'ACCEPTED') return 'badge badge-accepted';
    if (status === 'REJECTED') return 'badge badge-rejected';
    return 'badge badge-pending';
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div className="card-header">
          <h2>My Profile</h2>
          <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
        </div>

        <div className="card">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Start Date:</strong> {profile.startDate}</p>
        </div>

        <h3>Pay Rent</h3>
        <div className="card">
          <form onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label>Month</label>
              <input
                type="text"
                placeholder="e.g. October 2026"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Screenshot</label>
              <input
                id="screenshot-input"
                type="file"
                accept="image/*"
                onChange={(e) => setScreenshot(e.target.files[0])}
                required
              />
            </div>

            {uploadSuccess && (
              <p style={{ color: '#16a34a', marginBottom: '10px', fontWeight: 600 }}>
                {uploadSuccess}
              </p>
            )}
            <ErrorMessage message={uploadError} />

            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Submitting...' : 'Submit Payment'}
            </button>
          </form>
        </div>

        <h3>Rent History</h3>

        {rentData && (
          <div className="stats-row">
            <div className="stat-card">
              <p className="stat-number">{rentData.pendingCount}</p>
              <p className="stat-label">Pending</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">{rentData.completedCount}</p>
              <p className="stat-label">Completed</p>
            </div>
          </div>
        )}

        {rentData && rentData.history.length === 0 && (
          <p className="text-muted">No rent payments yet.</p>
        )}

        {rentData && rentData.history.map((payment) => (
          <div key={payment.id} className="card">
            <div className="card-header">
              <p><strong>{payment.month}</strong> — ₹{payment.amount}</p>
              <span className={getBadgeClass(payment.status)}>{payment.status}</span>
            </div>
            {payment.adminRemark && (
              <p className="text-muted">Remark: {payment.adminRemark}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;