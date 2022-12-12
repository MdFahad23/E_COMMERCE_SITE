export const showSuccess = (success, msg) => {
  if (success) return <div className="message">{msg}</div>;
};

export const showError = (error, msg) => {
  if (error) return <div className="message">{msg}</div>;
};

export const showLoading = (loading) => {
  if (loading) return <div className="message">Loading....</div>;
};
