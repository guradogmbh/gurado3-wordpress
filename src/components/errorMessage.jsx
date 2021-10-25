export default function ErrorMessage({ message }) {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        height: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {message}
    </div>
  );
}
