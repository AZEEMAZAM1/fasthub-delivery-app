import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { selectCartItems, selectOrderTotal, clearCart } from '../../store/slices/cartSlice';
import { createOrder } from '../../store/slices/orderSlice';

export default function CheckoutScreen({ navigation }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const orderTotal = useSelector(selectOrderTotal);
  const restaurant = useSelector((state) => state.cart.restaurant);
  const deliveryAddress = useSelector((state) => state.location.deliveryAddress);

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'card' },
    { id: 'apple', label: 'Apple Pay', icon: 'logo-apple' },
    { id: 'google', label: 'Google Pay', icon: 'logo-google' },
    { id: 'cash', label: 'Cash on Delivery', icon: 'cash' },
  ];

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        restaurant: restaurant._id,
        items: cartItems.map((item) => ({ menuItem: item._id, quantity: item.quantity, price: item.price })),
        deliveryAddress: deliveryAddress || { street: '123 Main Street', city: 'London', postcode: 'BR1 1AA' },
        paymentMethod,
        total: orderTotal,
      };
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      navigation.replace('OrderTracking');
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={COLORS.black} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity style={styles.addressCard}>
            <Ionicons name="location" size={24} color={COLORS.primary} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressTitle}>Home</Text>
              <Text style={styles.addressText}>123 Main Street, London, BR1 1AA</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity key={method.id} style={[styles.paymentOption, paymentMethod === method.id && styles.paymentOptionActive]} onPress={() => setPaymentMethod(method.id)}>
              <Ionicons name={method.icon} size={24} color={paymentMethod === method.id ? COLORS.primary : COLORS.gray} />
              <Text style={[styles.paymentLabel, paymentMethod === method.id && styles.paymentLabelActive]}>{method.label}</Text>
              <View style={[styles.radio, paymentMethod === method.id && styles.radioActive]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.orderItem}>
              <Text style={styles.orderItemQty}>{item.quantity}x</Text>
              <Text style={styles.orderItemName}>{item.name}</Text>
              <Text style={styles.orderItemPrice}>{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.placeOrderButton, isProcessing && styles.buttonDisabled]} onPress={handlePlaceOrder} disabled={isProcessing}>
          <Text style={styles.placeOrderText}>{isProcessing ? 'Processing...' : `Place Order - ${orderTotal.toFixed(2)}`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.padding, paddingVertical: 14 },
  headerTitle: { ...FONTS.h3, color: COLORS.black },
  content: { paddingBottom: 100 },
  section: { backgroundColor: COLORS.white, padding: SIZES.padding, marginBottom: 12 },
  sectionTitle: { ...FONTS.h4, color: COLORS.black, marginBottom: 14 },
  addressCard: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radiusSmall },
  addressInfo: { flex: 1, marginLeft: 12 },
  addressTitle: { ...FONTS.h4, color: COLORS.black },
  addressText: { ...FONTS.body3, color: COLORS.gray, marginTop: 2 },
  paymentOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  paymentOptionActive: { backgroundColor: COLORS.primaryLight, marginHorizontal: -SIZES.padding, paddingHorizontal: SIZES.padding, borderRadius: SIZES.radiusSmall },
  paymentLabel: { ...FONTS.body1, color: COLORS.darkGray, flex: 1, marginLeft: 14 },
  paymentLabelActive: { color: COLORS.primaryDark, fontWeight: '600' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.mediumGray },
  radioActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  orderItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  orderItemQty: { ...FONTS.body2, color: COLORS.primary, width: 30, fontWeight: '600' },
  orderItemName: { ...FONTS.body2, color: COLORS.black, flex: 1 },
  orderItemPrice: { ...FONTS.body2, color: COLORS.black, fontWeight: '600' },
  footer: { paddingHorizontal: SIZES.padding, paddingVertical: 16, backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  placeOrderButton: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  buttonDisabled: { opacity: 0.6 },
  placeOrderText: { color: COLORS.white, ...FONTS.h4 },
});
