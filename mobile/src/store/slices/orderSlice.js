import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const createOrder = createAsyncThunk('orders/create', async (orderData, { rejectWithValue }) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create order');
  }
});

export const fetchOrderHistory = createAsyncThunk('orders/history', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/orders/history');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    currentOrder: null,
    orderHistory: [],
    activeOrder: null,
    riderLocation: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setActiveOrder: (state, action) => { state.activeOrder = action.payload; },
    updateRiderLocation: (state, action) => { state.riderLocation = action.payload; },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      if (state.activeOrder && state.activeOrder._id === orderId) {
        state.activeOrder.status = status;
      }
    },
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.isLoading = true; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.activeOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.activeOrder = action.payload;
      });
  },
});

export const { setActiveOrder, updateRiderLocation, updateOrderStatus, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
