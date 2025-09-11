import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Gavel as GavelIcon,
  ShoppingBag as ShoppingBagIcon,
} from '@mui/icons-material';
import { removeItem, modifyItem } from '../../features/itemSlice';

const ItemCard = ({ item, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(removeItem(item.id));
    }
  };

  const handleToggleAuction = () => {
    const updatedItem = {
      ...item,
      auctionStatus: item.auctionStatus === 'on' ? 'off' : 'on',
    };
    dispatch(modifyItem({ itemId: item.id, itemData: updatedItem }));
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={item.image}
        alt={item.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {item.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {item.description.length > 100
            ? `${item.description.substring(0, 100)}...`
            : item.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${item.price}
        </Typography>

        {item.auctionStatus === 'on' && (
          <Box>
            <Chip
              icon={<GavelIcon />}
              label="Auction Active"
              color="success"
              size="small"
              sx={{ mb: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              Starting bid: ${item.startingBid}
            </Typography>
          </Box>
        )}

        {item.purchased && (
          <Chip
            icon={<ShoppingBagIcon />}
            label="Purchased"
            color="secondary"
            size="small"
            sx={{ mb: 1 }}
          />
        )}
      </CardContent>

      {!item.purchased && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <IconButton size="small" color="primary" onClick={() => onEdit(item)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Button
            size="small"
            variant={item.auctionStatus === 'on' ? 'outlined' : 'contained'}
            color={item.auctionStatus === 'on' ? 'secondary' : 'primary'}
            onClick={handleToggleAuction}
          >
            {item.auctionStatus === 'on' ? 'Stop Auction' : 'Start Auction'}
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default ItemCard;
