import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ItemCard from './ItemCard';

const ItemsGrid = ({ items, activeTab, onEditItem, onClick }) => {
  if (items.length === 0) {
    return (
      <Grid item xs={12}>
        <Box textAlign="center" py={5}>
          <Typography variant="h6" color="textSecondary">
            {activeTab === 0
              ? "You haven't added any items yet."
              : activeTab === 1
                ? "You don't have any active auction items."
                : "You haven't purchased any items yet."}
          </Typography>
          {activeTab === 0 && (
            <Button onClick={onClick} variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }}>
              Add Your First Item
            </Button>
          )}
        </Box>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ItemCard item={item} onEdit={onEditItem} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemsGrid;
