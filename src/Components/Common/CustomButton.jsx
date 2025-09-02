import { Button as MuiButton } from '@mui/material';

const CustomButton = ({ children = 'Click Me', onClick, ...props }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      onClick={typeof onClick === 'function' ? onClick : undefined}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default CustomButton;
