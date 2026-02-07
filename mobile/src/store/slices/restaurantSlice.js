import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchRestaurants = createAsyncThunk('restaurants/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const response = await api.get('/restaurants', { params });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurants');
  }
});

export const fetchRestaurantById = createAsyncThunk('restaurants/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch restaurant');
  }
});

export const searchRestaurants = createAsyncThunk('restaurants/search', async (query, { rejectWithValue }) => {
  try {
    const response = await api.get('/restaurants/search', { params: { q: query } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Search failed');
  }
});

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    featured: [],
    nearby: [],
    selectedRestaurant: null,
    searchResults: [],
    categories: ['All', 'Pizza', 'Burgers', 'Sushi', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Italian', 'Healthy', 'Desserts', 'Breakfast'],
    selectedCategory: 'All',
    isLoading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearSelectedRestaurant: (state) => {
      state.selectedRestaurant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => { state.isLoading = true; })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload.restaurants || action.payload;
        state.featured = action.payload.featured || [];
        state.nearby = action.payload.nearby || [];
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.selectedRestaurant = action.payload;
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const { setSelectedCategory, clearSearchResults, clearSelectedRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
