import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { removeFromCart, updateQuantity, clearCart, selectCartItems, selectCartTotal, selectDeliveryFee, selectServiceFee, selectOrderTotal } from '../../store/slices/cartSlice';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const deliveryFee = useSelector(selectDeliveryFee);
  const serviceFee = useSelector(selectServiceFee);
  const orderTotal = useSelector(selectOrderTotal);
  const restaurant = useSelector((state) => state.cart.restaurant);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.black} /></TouchableOpacity>
          <Text style={styles.headerTitle}>Your Cart</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color={COLORS.mediumGray} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items from a restaurant to get started</Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.browseButtonText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.qtyButton} onPress={() => dispatch(removeFromCart(item._id))}>
          <Ionicons name="remove" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity style={styles.qtyButton} onPress={() => dispatch(updateQuantity({ itemId: item._id, quantity: item.quantity + 1 }))}>
          <Ionicons name="add" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.black} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={() => dispatch(clearCart())}><Text style={styles.clearText}>Clear</Text></TouchableOpacity>
      </View>

      {restaurant && <View style={styles.restaurantBanner}><Ionicons name="restaurant" size={20} color={COLORS.primary} /><Text style={styles.restaurantName}>{restaurant.name}</Text></View>}

      <FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={(item) => item._id} contentContainerStyle={styles.listContent} />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>{subtotal.toFixed(2)}</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Delivery fee</Text><Text style={styles.summaryValue}>{deliveryFee.toFixed(2)}</Text></View>
        <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Service fee</Text><Text style={styles.summaryValue}>{serviceFee.toFixed(2)}</Text></View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{orderTotal.toFixed(2)}</Text></View>

        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutText}>Go to Checkout - {orderTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.padding, paddingVertical: 14 },
  headerTitle: { ...FONTS.h3, color: COLORS.black },
  clearText: { ...FONTS.body2, color: COLORS.error },
  emptyCart: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { ...FONTS.h3, color: COLORS.black, marginTop: 20 },
  emptySubtitle: { ...FONTS.body2, color: COLORS.gray, textAlign: 'center', marginTop: 8 },
  browseButton: { backgroundColor: COLORS.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: SIZES.radius, marginTop: 24 },
  browseButtonText: { color: COLORS.white, ...FONTS.h4 },
  restaurantBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primaryLight, paddingHorizontal: SIZES.padding, paddingVertical: 12, marginBottom: 8 },
  restaurantName: { ...FONTS.h4, color: COLORS.primaryDark, marginLeft: 8 },
  listContent: { paddingHorizontal: SIZES.padding },
  cartItem: { backgroundColor: COLORS.white, borderRadius: SIZES.radiusSmall, padding: 16, marginBottom: 10, ...SHADOWS.light },
  itemInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemName: { ...FONTS.h4, color: COLORS.black, flex: 1 },
  itemPrice: { ...FONTS.h4, color: COLORS.black },
  quantityControl: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  qtyButton: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  qtyText: { ...FONTS.h4, color: COLORS.black, marginHorizontal: 16 },
  summaryContainer: { backgroundColor: COLORS.white, paddingHorizontal: SIZES.padding, paddingVertical: 20, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { ...FONTS.body2, color: COLORS.gray },
  summaryValue: { ...FONTS.body2, color: COLORS.black },
  divider: { height: 1, backgroundColor: COLORS.lightGray, marginVertical: 10 },
  totalLabel: { ...FONTS.h4, color: COLORS.black },
  totalValue: { ...FONTS.h3, color: COLORS.black },
  checkoutButton: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  checkoutText: { color: COLORS.white, ...FONTS.h4 },
});
