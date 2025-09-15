import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  startAuction as apiStartAuction,
  alllistedItem,
  listedItem,
  soldItems,
  unSoldItems,
  placeBid,
  getPayableItems,
  purchaseItem,
  singleItem,
} from '../api/auctionApi';

export const getItems = createAsyncThunk('items/getItems', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetchItems(userId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const addItem = createAsyncThunk(
  'items/createItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await createItem(itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const modifyItem = createAsyncThunk(
  'items/modifyItem',
  async ({ itemId, itemData }, { rejectWithValue }) => {
    try {
      const response = await updateItem(itemId, itemData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  'items/removeItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await deleteItem(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const startAuction = createAsyncThunk(
  'items/startAuction',
  async ({ itemId, data }, { rejectWithValue }) => {
    try {
      const response = await apiStartAuction(itemId, data);
      return { itemId, auction: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const liveAuction = createAsyncThunk('items/liveAuction', async (_, { rejectWithValue }) => {
  try {
    const response = await alllistedItem();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const getListedItems = createAsyncThunk(
  'items/getListedItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await listedItem();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSoldItems = createAsyncThunk(
  'items/getSoldItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await soldItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUnsoldItems = createAsyncThunk(
  'items/getUnsoldItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await unSoldItems();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const placeBidThunk = createAsyncThunk(
  'items/placeBid',
  async ({ auctionId, amount }, { rejectWithValue }) => {
    try {
      const response = await placeBid(auctionId, amount);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPurchasedItems = createAsyncThunk(
  'items/getPurchasedItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await purchaseItem();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSingleItem = createAsyncThunk(
  'items/getSingleItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await singleItem(itemId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const payableItemsThunk = createAsyncThunk('items/getPayableItems', async (_, thunkAPI) => {
  try {
    const response = await getPayableItems();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    listedItems: [],
    liveAuctions: [],
    soldItems: [],
    unsoldItems: [],
    purchasedItems: [],
    payableItems: [],
    currentItem: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addItem.fulfilled, (state, action) => {
        if (action.payload) {
          state.items.push(action.payload);
        }
      })

      .addCase(modifyItem.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(
          (it) => it.itemId === updated.itemId || it.id === updated.id
        );
        if (index !== -1) state.items[index] = updated;
      })

      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (it) => it.itemId !== action.payload && it.id !== action.payload
        );
      })

      .addCase(startAuction.fulfilled, (state, action) => {
        const { itemId, auction } = action.payload;
        const index = state.items.findIndex((it) => it.itemId === itemId || it.id === itemId);
        if (index !== -1) {
          state.items[index].auctionEnabled = true;
          state.items[index].auction = auction;
        }
      })

      .addCase(getListedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListedItems.fulfilled, (state, action) => {
        state.listedItems = action.payload || [];
        state.loading = false;
      })
      .addCase(getListedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(liveAuction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(liveAuction.fulfilled, (state, action) => {
        state.liveAuctions = action.payload || [];
        state.loading = false;
      })
      .addCase(liveAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSoldItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSoldItems.fulfilled, (state, action) => {
        state.soldItems = action.payload || [];
        state.loading = false;
      })
      .addCase(getSoldItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUnsoldItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnsoldItems.fulfilled, (state, action) => {
        state.unsoldItems = action.payload || [];
        state.loading = false;
      })
      .addCase(getUnsoldItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(payableItemsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payableItemsThunk.fulfilled, (state, action) => {
        state.payableItems = action.payload || [];
        state.loading = false;
      })
      .addCase(payableItemsThunk.rejected, (state, action) => {
        state.payableItems = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPurchasedItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPurchasedItems.fulfilled, (state, action) => {
        state.purchasedItems = action.payload || [];
        state.loading = false;
      })
      .addCase(getPurchasedItems.rejected, (state, action) => {
        state.purchasedItems = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleItem.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(getSingleItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = itemsSlice.actions;
export default itemsSlice.reducer;
