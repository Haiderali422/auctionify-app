import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createItem, modifyItem } from '../../features/itemSlice';

const ItemDialog = ({ open, onClose, editingItem }) => {
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //   const user = localStorage.getItem('user', JSON.parse(user));
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    auctionStatus: 'off',
    startingBid: '',
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        description: editingItem.description,
        price: editingItem.price,
        image: editingItem.image,
        auctionStatus: editingItem.auctionStatus || 'off',
        startingBid: editingItem.startingBid || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        auctionStatus: 'off',
        startingBid: '',
      });
    }
  }, [editingItem, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const itemData = {
      ...formData,
      userId: id,
    };

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
        <Box component="form" sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Item Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.price}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.image}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Auction Status</InputLabel>
            <Select
              name="auctionStatus"
              value={formData.auctionStatus}
              label="Auction Status"
              onChange={handleInputChange}
            >
              <MenuItem value="off">Off</MenuItem>
              <MenuItem value="on">On</MenuItem>
            </Select>
          </FormControl>
          {formData.auctionStatus === 'on' && (
            <TextField
              margin="dense"
              name="startingBid"
              label="Starting Bid"
              type="number"
              fullWidth
              variant="outlined"
              value={formData.startingBid}
              onChange={handleInputChange}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          {editingItem ? 'Update' : 'Add'} Item
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;
