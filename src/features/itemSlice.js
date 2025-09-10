import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchItems, createItem, updateItem, deleteItem } from '../api/auctionApi';

export const getItems = createAsyncThunk('items/getItems', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetchItems(userId);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addItem = createAsyncThunk(
  'items/createItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await createItem(itemData);
      console.log('The response create', response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const modifyItem = createAsyncThunk(
  'items/modifyItem',
  async ({ itemId, itemData }, { rejectWithValue }) => {
    try {
      const response = await updateItem(itemId, itemData);
      console.log(response);
      return { id: itemId, ...itemData };
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
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
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.items.push(action.payload);
        } else {
          console.warn('Unexpected addItem payload:', action.payload);
        }
      })
      .addCase(modifyItem.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex((item) => item.id === (updated?.id || updated?.itemId));
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { clearError } = itemsSlice.actions;
export default itemsSlice.reducer;
