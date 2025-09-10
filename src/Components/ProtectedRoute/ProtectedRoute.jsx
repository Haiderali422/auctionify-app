import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../Hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { tokens, loading } = useAuth();
  const { firebase_uid } = useSelector((state) => state.user);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '300px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!firebase_uid || !tokens.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
