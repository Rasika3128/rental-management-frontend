function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div style={{
      background: '#fee',
      border: '1px solid #f88',
      color: '#c00',
      padding: '10px 15px',
      borderRadius: '5px',
      marginBottom: '10px',
    }}>
      {message}
    </div>
  );
}

export default ErrorMessage;