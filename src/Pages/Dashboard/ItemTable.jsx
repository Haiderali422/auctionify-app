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
import { normalize, formatCurrency } from '../../utils';
const ItemsTable = ({
  items = [],
  activeTab = 0,
  onEditItem,
  onDeleteItem,
  onToggleAuction,
  onAddItem,
  onOpenAuctionDialog,
  onPay,
}) => {
  if (!items || items.length === 0) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="textSecondary">
          {activeTab === 0
            ? "You haven't added any items yet."
            : activeTab === 1
              ? "You don't have any active auction items."
              : activeTab === 2
                ? "You haven't won any items yet."
                : activeTab === 3
                  ? "You haven't purchased any items yet."
                  : activeTab === 4
                    ? 'No sold items found.'
                    : 'No unsold items found.'}
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

            {activeTab === 2 ? (
              <>
                <TableCell>Winning Bid</TableCell>
                <TableCell>Payable Amount</TableCell>
                <TableCell align="center">Payment</TableCell>
              </>
            ) : (
              <>
                <TableCell>Auction Status</TableCell>
                <TableCell>Starting Bid</TableCell>
                <TableCell align="center">Actions</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((row) => {
            const r = normalize(row);
            const key = r.auctionId ?? r.id ?? Math.random();

            return (
              <TableRow key={key} hover>
                <TableCell>
                  <Box
                    component="img"
                    src={r.imageUrl || placeholder}
                    alt={r.title}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      borderRadius: 1,
                      backgroundColor: '#f5f5f5',
                    }}
                    onError={(e) => (e.target.src = placeholder)}
                  />
                </TableCell>

                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {r.title}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 300 }}>
                    {r.description?.length > 120
                      ? `${r.description.substring(0, 120)}...`
                      : r.description}
                  </Typography>
                </TableCell>

                {activeTab === 2 ? (
                  // Won items row (Pay)
                  <>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {formatCurrency(r.winningBid)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatCurrency(r.payableAmount)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        startIcon={<ShoppingBagIcon />}
                        onClick={() => onPay && onPay(r.auctionId)}
                      >
                        Pay Now
                      </Button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      {activeTab === 3 ? (
                        <Chip
                          icon={<ShoppingBagIcon />}
                          label="Paid"
                          color="secondary"
                          size="small"
                        />
                      ) : activeTab === 4 ? (
                        <Chip label="Sold" color="info" size="small" />
                      ) : activeTab === 5 ? (
                        <Chip label="Unsold" color="warning" size="small" />
                      ) : r.purchased ? (
                        <Chip
                          icon={<ShoppingBagIcon />}
                          label="Purchased"
                          color="secondary"
                          size="small"
                        />
                      ) : r.auctionEnabled ? (
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
                      {r.startingBid ? (
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(r.startingBid)}
                        </Typography>
                      ) : (
                        '-'
                      )}
                    </TableCell>

                    <TableCell align="center">
                      <Box
                        sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}
                      >
                        {/* Rules:
                            - If auction is active => only show Stop button (no edit/delete)
                            - If auction is not active => allow Edit/Delete and Start
                            - Listed items: we prefer only Stop action (no edit/delete)
                            - Purchased/Sold/Unsold: show status only (no actions)
                        */}
                        {/* If purchased or sold or unsold -> no edit/delete */}
                        {activeTab === 3 || activeTab === 4 || activeTab === 5 ? (
                          <></>
                        ) : (
                          <>
                            {/* If auction is active -> show Stop only */}
                            {r.auctionEnabled ? (
                              <Button
                                size="small"
                                variant="outlined"
                                color="secondary"
                                onClick={() => onToggleAuction && onToggleAuction(r.raw)}
                              >
                                Stop
                              </Button>
                            ) : (
                              // auction not active -> allow edit/delete and Start
                              <>
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => onEditItem && onEditItem(r.rawSource)}
                                  title="Edit"
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => onDeleteItem && onDeleteItem(r.id)}
                                  title="Delete"
                                >
                                  <DeleteIcon />
                                </IconButton>

                                <Button
                                  size="small"
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    r.auctionEnabled
                                      ? onToggleAuction && onToggleAuction(r.raw)
                                      : onOpenAuctionDialog && onOpenAuctionDialog(r.raw)
                                  }
                                  sx={{ minWidth: 110 }}
                                >
                                  Start
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;
