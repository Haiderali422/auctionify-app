import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Paper, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../Components/Common/CustomInput';
import CustomButton from '../../Components/Common/CustomButton';
import { SET_LOADING, SET_TOKENS } from '../../features/auctionSlice';
import { signupSchema } from '../../Schemas/validation';
import { signInWithGoogle, signUpWithEmail } from '../../lib/firebase';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auction);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setError('');
    dispatch(SET_LOADING(true));

    try {
      const firebaseUser = await signUpWithEmail(data.email, data.password);

      const idToken = await firebaseUser.getIdToken();

      dispatch(
        SET_TOKENS({
          accessToken: idToken,
          refreshToken: firebaseUser.refreshToken,
        })
      );
      console.log('Sign up successful ✅');
      reset();
      navigate('/dashboard');
    } catch (err) {
      console.error('Sign up error:', err.code, err.message);

      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message);
      }
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    dispatch(SET_LOADING(true));

    try {
      const firebaseUser = await signInWithGoogle();
      const idToken = await firebaseUser.getIdToken();

      dispatch(
        SET_TOKENS({
          accessToken: idToken,
          refreshToken: firebaseUser.refreshToken,
        })
      );
      console.log('Google sign up successful ✅');
      navigate('/dashboard');
    } catch (err) {
      console.error('Google sign up error:', err.code, err.message);
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
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Join us today
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
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
              fullWidth
            />

            <CustomInput
              label="Password"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 2 }}
              fullWidth
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              sx={{ mb: 2 }}
              fullWidth
            />

            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </CustomButton>

            <CustomButton
              onClick={handleGoogleSignUp}
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
              Sign up with Google
            </CustomButton>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
