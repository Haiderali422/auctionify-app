import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, modifyItem } from '../../features/itemSlice';
import CustomInput from '../../Components/Common/CustomInput';
import CustomButton from '../../Components/Common/CustomButton';
import { itemSchema } from '../../Schemas/itemSchema';

const ItemDialog = ({ open, onClose, editingItem }) => {
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      image: '',
      startingBid: '',
    },
  });

  useEffect(() => {
    if (editingItem) {
      reset({
        title: editingItem.title || '',
        description: editingItem.description || '',
        price: editingItem.price || '',
        image: editingItem.image || '',
        startingBid: editingItem.startingBid || '',
      });
    } else {
      reset({
        title: '',
        description: '',
        price: '',
        image: '',
        startingBid: '',
      });
    }
  }, [editingItem, reset, open]);

  const onSubmit = (data) => {
    const itemData = { ...data, userId: id };

    if (editingItem) {
      dispatch(modifyItem({ itemId: editingItem.id, itemData }));
    } else {
      dispatch(createItem(itemData));
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ pt: 1 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Item Title"
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Description"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Price"
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                label="Image URL"
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            )}
          />
          {editingItem && (
            <Controller
              name="startingBid"
              control={control}
              render={({ field }) => (
                <CustomInput
                  {...field}
                  label="Starting Bid"
                  type="number"
                  error={!!errors.startingBid}
                  helperText={errors.startingBid?.message}
                />
              )}
            />
          )}

          <DialogActions>
            <CustomButton onClick={onClose}>Cancel</CustomButton>
            <CustomButton type="submit" variant="contained">
              {editingItem ? 'Update' : 'Add'} Item
            </CustomButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
