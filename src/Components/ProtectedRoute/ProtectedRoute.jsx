import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../Hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { tokens, loading } = useAuth();
  const user = localStorage.getItem('user');

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !tokens.accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
