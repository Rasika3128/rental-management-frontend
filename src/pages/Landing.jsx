import { Link } from 'react-router-dom';
import HouseIllustration from '../components/HouseIllustration';

function Landing() {
  return (
    <div className="split-page">
      <div className="split-visual">
        <HouseIllustration />
        <h1>RentEase</h1>
        <p>The simplest way to manage rentals, payments, and approvals — all in one place.</p>
      </div>

      <div className="split-form-side">
        <div className="split-form-box" style={{ textAlign: 'center' }}>
          <h2>Welcome to RentEase</h2>
          <p className="text-muted" style={{ marginBottom: '30px', marginTop: '-10px' }}>
            A simple rental management platform for tenants and property admins.
          </p>

          <div style={{ textAlign: 'left', marginBottom: '30px' }}>
            <FeatureItem text="Track your rent payment history" />
            <FeatureItem text="Upload payment screenshots instantly" />
            <FeatureItem text="Get admin approval status in real-time" />
            <FeatureItem text="Secure JWT-based authentication" />
          </div>

          <Link to="/login">
            <button className="btn btn-primary" style={{ marginBottom: '12px' }}>
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="btn btn-outline" style={{ width: '100%', padding: '12px' }}>
              Create an Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <span style={{
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        flexShrink: 0,
      }}>
        ✓
      </span>
      <span style={{ fontSize: '14px', color: '#333' }}>{text}</span>
    </div>
  );
}

export default Landing;