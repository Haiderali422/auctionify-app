import * as yup from 'yup';

export const signupSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .test(
      'no-whitespace',
      'First Name cannot be empty',
      (value) => value && value.trim().length > 0
    ),
  lastName: yup
    .string()
    .required('Last Name is required')
    .test(
      'no-whitespace',
      'Last Name cannot be empty',
      (value) => value && value.trim().length > 0
    ),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
