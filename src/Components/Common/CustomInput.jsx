import { TextField } from '@mui/material';

const CustomInput = ({ label, type = 'text', ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      margin="normal"
      {...props} // pass down sx, value, onChange, etc.
    />
  );
};

export default CustomInput;
