import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import ErrorMessage from '../components/ErrorMessage';
import HouseIllustration from '../components/HouseIllustration';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    startDate: '',
  });
  const [idProof, setIdProof] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match');
      return;
    }

    if (!idProof || !photo) {
      setError('Please upload both ID proof and photo');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name.trim());
    data.append('email', formData.email.trim());
    data.append('phone', formData.phone.trim());
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    data.append('startDate', formData.startDate);
    data.append('idProof', idProof);
    data.append('photo', photo);

    try {
      const response = await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { token, name, email, role } = response.data;
      login(token, { name, email, role });
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-page">
      <div className="split-visual">
        <HouseIllustration />
        <h1>RentEase</h1>
        <p>Join us and manage your rental payments effortlessly.</p>
      </div>

      <div className="split-form-side">
        <div className="split-form-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2>Create Account</h2>
          <p className="text-muted" style={{ marginBottom: '20px', marginTop: '-15px' }}>
            Register to get started
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ID Proof</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setIdProof(e.target.files[0])}
                required
              />
            </div>

            <div className="form-group">
              <label>Passport Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                required
              />
            </div>

            <ErrorMessage message={error} />

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;