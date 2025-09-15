import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const AuctionDialog = ({ open, onClose, onConfirm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    onConfirm({
      startingBid: parseFloat(data.starting_bid),
      duration: parseInt(data.duration, 10),
    });
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Start Auction</DialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Starting Bid"
            type="number"
            {...register('starting_bid', { required: 'Starting bid is required' })}
            error={!!errors.starting_bid}
            helperText={errors.starting_bid?.message}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Duration (minutes)"
            placeholder="By defaul is 24hours"
            type="number"
            {...register('duration', { required: 'Duration is required' })}
            error={!!errors.duration}
            helperText={errors.duration?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset();
              onClose();
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Start
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AuctionDialog;
