import placeholder from '../../assets/images/placeholder-image.jpg';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Gavel as GavelIcon,
  ShoppingBag as ShoppingBagIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const ItemsTable = ({ items, activeTab, onEditItem, onDeleteItem, onToggleAuction, onAddItem }) => {
  if (items.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="textSecondary">
          {activeTab === 0
            ? "You haven't added any items yet."
            : activeTab === 1
              ? "You don't have any active auction items."
              : "You haven't purchased any items yet."}
        </Typography>
        {activeTab === 0 && (
          <Button onClick={onAddItem} variant="contained" startIcon={<AddIcon />} sx={{ mt: 2 }}>
            Add Your First Item
          </Button>
        )}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Auction Status</TableCell>
            <TableCell>Starting Bid</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items
            .filter((item) => item)
            .map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>
                  <Box
                    component="img"
                    src={item.image_url || placeholder}
                    alt={item.title}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    }}
                    onError={(e) => {
                      e.target.src = placeholder;
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {item.title}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {item.description?.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </Typography>
                </TableCell>

                <TableCell>
                  {item.purchased ? (
                    <Chip
                      icon={<ShoppingBagIcon />}
                      label="Purchased"
                      color="secondary"
                      size="small"
                    />
                  ) : item.auction_enabled ? (
                    <Chip
                      icon={<GavelIcon />}
                      label="Auction Active"
                      color="success"
                      size="small"
                    />
                  ) : (
                    <Chip label="Inactive" color="default" size="small" />
                  )}
                </TableCell>

                <TableCell>
                  {item.auction_enabled && item.aution ? (
                    <Typography variant="body2" fontWeight="bold">
                      ${item.aution.starting_bid}
                    </Typography>
                  ) : (
                    '-'
                  )}
                </TableCell>

                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEditItem(item)}
                      disabled={item.purchased}
                      title="Edit Item"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDeleteItem(item.id)}
                      disabled={item.purchased}
                      title="Delete Item"
                    >
                      <DeleteIcon />
                    </IconButton>
                    {!item.purchased && (
                      <Button
                        size="small"
                        variant={item.auction_enabled ? 'outlined' : 'contained'}
                        color={item.auction_enabled ? 'secondary' : 'primary'}
                        onClick={() => onToggleAuction(item)}
                        sx={{ minWidth: 120 }}
                        title={item.auction_enabled ? 'Stop Auction' : 'Start Auction'}
                      >
                        {item.auction_enabled ? 'Stop' : 'Start'}
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
