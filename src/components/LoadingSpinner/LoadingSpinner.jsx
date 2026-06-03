function LoadingSpinner() {
  return (
    <div className="loading-screen">
      <div className="spinner" role="status" aria-label="Loading" />
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
