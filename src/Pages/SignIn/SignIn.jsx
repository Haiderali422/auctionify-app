import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import CustomInput from '../../Components/Common/CustomInput';
import CustomButton from '../../Components/Common/CustomButton';
import { SET_LOADING, SET_TOKENS } from '../../features/auctionSlice';
import { signInWithEmail, signInWithGoogle } from '../../lib/firebase';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auction);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError('');
    dispatch(SET_LOADING(true));

    try {
      const firebaseUser = await signInWithEmail(data.email, data.password);

      const idToken = await firebaseUser.getIdToken();

      // 3. Store tokens in Redux and localStorage
      dispatch(
        SET_TOKENS({
          accessToken: idToken,
          refreshToken: firebaseUser.refreshToken,
        })
      );
      console.log('Login successful ✅');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.code, err.message);

      // Handle specific error cases
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError(err.message);
      }
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    dispatch(SET_LOADING(true));

    try {
      const firebaseUser = await signInWithGoogle();
      const idToken = await firebaseUser.getIdToken();
      console.log('IDTOken', idToken);
      dispatch(
        SET_TOKENS({
          accessToken: idToken,
          refreshToken: firebaseUser.refreshToken,
        })
      );

      console.log('Google login successful ✅');
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err.code, err.message);
      setError(err.message);
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" fontWeight="bold" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomInput
              label="Email"
              type="email"
              autoComplete="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
              fullWidth
            />

            <CustomInput
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 2 }}
              fullWidth
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <FormControlLabel
                control={<Checkbox {...register('remember')} color="primary" />}
                label="Remember me"
              />

              <Link
                href="#"
                variant="body2"
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement forgot password functionality
                  console.log('Forgot password clicked');
                }}
                sx={{ textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </Box>

            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </CustomButton>

            <CustomButton
              onClick={handleGoogleSignIn}
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              disabled={loading}
              startIcon={
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  width="20"
                  height="20"
                />
              }
            >
              Sign in with Google
            </CustomButton>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
