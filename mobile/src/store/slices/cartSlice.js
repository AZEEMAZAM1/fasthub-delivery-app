import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurant: null,
  deliveryFee: 2.99,
  serviceFee: 0.99,
  promoCode: null,
  promoDiscount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurant } = action.payload;
      if (state.restaurant && state.restaurant._id !== restaurant._id) {
        state.items = [];
      }
      state.restaurant = restaurant;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i._id === itemId);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((i) => i._id !== itemId);
        } else {
          existingItem.quantity -= 1;
        }
      }
      if (state.items.length === 0) {
        state.restaurant = null;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      state.promoCode = null;
      state.promoDiscount = 0;
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((i) => i._id === itemId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== itemId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    applyPromoCode: (state, action) => {
      state.promoCode = action.payload.code;
      state.promoDiscount = action.payload.discount;
    },
  },
});

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartRestaurant = (state) => state.cart.restaurant;
export const selectDeliveryFee = (state) => state.cart.deliveryFee;
export const selectServiceFee = (state) => state.cart.serviceFee;
export const selectOrderTotal = (state) => {
  const subtotal = state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  return subtotal + state.cart.deliveryFee + state.cart.serviceFee - state.cart.promoDiscount;
};

export const { addToCart, removeFromCart, clearCart, updateQuantity, applyPromoCode } = cartSlice.actions;
export default cartSlice.reducer;
