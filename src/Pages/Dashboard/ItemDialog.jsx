import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { addItemSchema } from '../../Schemas/addItemSchema';
import { addItem, modifyItem, getItems } from '../../features/itemSlice';

const ItemDialog = ({ open, onClose, editingItem }) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addItemSchema),
    defaultValues: {
      title: '',
      description: '',
      image_url: '',
    },
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        title: editingItem.title || '',
        description: editingItem.description || '',
        image_url: editingItem.image_url || '',
      });
    }
  }, [editingItem, reset]);

  const onSubmit = (data) => {
    let itemData = { ...data, owner_id: id };
    console.log('itemData', itemData);

    if (itemData.auctionStatus === 'off') {
      delete itemData.startingBid;
    }

    if (editingItem) {
      dispatch(modifyItem({ itemId: editingItem.id, itemData }))
        .unwrap()
        .then(() => dispatch(getItems(id)));
    } else {
      dispatch(addItem(itemData))
        .unwrap()
        .then(() => dispatch(getItems(id)));
    }

    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
            fullWidth
            margin="normal"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            {...register('image_url')}
            error={!!errors.image}
            helperText={errors.image?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {editingItem ? 'Save Changes' : 'Add Item'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemDialog;
