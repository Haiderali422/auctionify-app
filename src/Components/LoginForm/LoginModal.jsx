import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import { SET_LOGIN_OPEN } from '../../features/auctionSlice';
import { signInWithEmail, signInWithGoogle } from '../../lib/firebase';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { loginOpen, loading, error } = useSelector((state) => state.auction);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log('Login form submitted', data.email, data.password);
    signInWithEmail(data.email, data.password);
  };

  return (
    <>
      <CustomButton onClick={() => dispatch(SET_LOGIN_OPEN(true))}>Sign In</CustomButton>

      <Dialog
        open={loginOpen}
        onClose={() => dispatch(SET_LOGIN_OPEN(false))}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sign in to your account
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomInput
              label="Email"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <CustomInput
              label="Password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
              <FormControlLabel
                control={<Checkbox {...register('remember')} color="primary" />}
                label="Remember me"
              />

              <Link href="#" variant="body2" color="secondary">
                Forgot password?
              </Link>
            </Box>

            <CustomButton type="submit" fullWidth sx={{ mt: 3, py: 1.5 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </CustomButton>

            {/* Google */}
            <CustomButton
              onClick={signInWithGoogle}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
            >
              Sign in with Google
            </CustomButton>

            <Typography variant="body2" align="center" sx={{ mt: 3, mb: 2 }}>
              Don&apos;t have an account?{' '}
              <Link href="#" color="primary" fontWeight="bold">
                Sign up
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginModal;
