import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthed = false; // Replace with real auth check
  if (!isAuthed) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
