import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Link,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../Common/CustomInput';
import CustomButton from '../Common/CustomButton';
import { SET_SIGNUP_OPEN } from '../../features/auctionSlice';
import { signupSchema } from '../../Schemas/validation';
import { signInWithGoogle, signUpWithEmail } from '../../lib/firebase';

const SignupModal = () => {
  const dispatch = useDispatch();
  const { signUpOpen, loading, error } = useSelector((state) => state.auction);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    signUpWithEmail(data.firstName, data.lastName, data.email, data.password);
  };

  return (
    <>
      <CustomButton onClick={() => dispatch(SET_SIGNUP_OPEN(true))} color="secondary">
        Sign Up
      </CustomButton>

      <Dialog
        open={signUpOpen}
        onClose={() => dispatch(SET_SIGNUP_OPEN(false))}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h4" component="div" fontWeight="bold">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Join us today
          </Typography>
        </DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box display="flex" gap={2}>
              {/* First Name */}
              <CustomInput
                label="First Name"
                {...register('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />

              <CustomInput
                label="Last Name"
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Box>

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

            <CustomInput
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <CustomButton type="submit" fullWidth sx={{ mt: 2, py: 1.5 }} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </CustomButton>

            <CustomButton
              onClick={signInWithGoogle}
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
            >
              Sign up with Google
            </CustomButton>

            <Typography variant="body2" align="center" sx={{ mt: 3, mb: 2 }}>
              Already have an account?{' '}
              <Link href="#" color="primary" fontWeight="bold">
                Sign in
              </Link>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignupModal;
