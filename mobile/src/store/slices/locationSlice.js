import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    currentLocation: null,
    deliveryAddress: null,
    savedAddresses: [],
  },
  reducers: {
    setCurrentLocation: (state, action) => { state.currentLocation = action.payload; },
    setDeliveryAddress: (state, action) => { state.deliveryAddress = action.payload; },
    addSavedAddress: (state, action) => { state.savedAddresses.push(action.payload); },
    removeSavedAddress: (state, action) => {
      state.savedAddresses = state.savedAddresses.filter((a) => a._id !== action.payload);
    },
  },
});

export const { setCurrentLocation, setDeliveryAddress, addSavedAddress, removeSavedAddress } = locationSlice.actions;
export default locationSlice.reducer;
