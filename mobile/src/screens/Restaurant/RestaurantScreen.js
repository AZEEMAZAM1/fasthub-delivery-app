import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { addToCart, selectCartCount } from '../../store/slices/cartSlice';

const SAMPLE_MENU = [
  { category: 'Popular', items: [
    { _id: 'm1', name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, onion and special sauce', price: 8.99, popular: true },
    { _id: 'm2', name: 'Chicken Wings', description: '8 pieces with buffalo or BBQ sauce', price: 7.49, popular: true },
  ]},
  { category: 'Mains', items: [
    { _id: 'm3', name: 'Grilled Chicken', description: 'Served with rice and seasonal vegetables', price: 12.99 },
    { _id: 'm4', name: 'Fish and Chips', description: 'Battered cod with thick-cut chips and mushy peas', price: 11.49 },
    { _id: 'm5', name: 'Veggie Bowl', description: 'Quinoa, avocado, sweet potato, kale and tahini dressing', price: 10.99 },
  ]},
  { category: 'Sides', items: [
    { _id: 'm6', name: 'Fries', description: 'Crispy golden fries with sea salt', price: 3.49 },
    { _id: 'm7', name: 'Coleslaw', description: 'Fresh homemade coleslaw', price: 2.49 },
  ]},
  { category: 'Drinks', items: [
    { _id: 'm8', name: 'Coca-Cola', description: '330ml can', price: 1.99 },
    { _id: 'm9', name: 'Fresh Orange Juice', description: 'Freshly squeezed 300ml', price: 3.49 },
  ]},
];

export default function RestaurantScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item, restaurant }));
  };

  const renderMenuItem = (item) => (
    <TouchableOpacity key={item._id} style={styles.menuItem} onPress={() => handleAddToCart(item)}>
      <View style={styles.menuItemInfo}>
        {item.popular && <View style={styles.popularBadge}><Text style={styles.popularText}>Popular</Text></View>}
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.addButton}>
        <Ionicons name="add" size={22} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
          <Ionicons name="cart" size={24} color={COLORS.black} />
          {cartCount > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View>}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.restaurantHeader}>
          <View style={styles.imagePlaceholder}><Ionicons name="restaurant" size={50} color={COLORS.primary} /></View>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.cuisineText}>{restaurant.cuisine}</Text>
            <View style={styles.infoRow}>
              <Ionicons name="star" size={16} color={COLORS.star} />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
              <Text style={styles.dotSeparator}>-</Text>
              <Ionicons name="time" size={16} color={COLORS.gray} />
              <Text style={styles.deliveryText}>{restaurant.deliveryTime}</Text>
              <Text style={styles.dotSeparator}>-</Text>
              <Text style={styles.feeText}>Delivery {restaurant.deliveryFee}</Text>
            </View>
          </View>
        </View>

        {SAMPLE_MENU.map((section) => (
          <View key={section.category} style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{section.category}</Text>
            {section.items.map(renderMenuItem)}
          </View>
        ))}
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity style={styles.viewCartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.viewCartText}>View Cart ({cartCount})</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SIZES.padding, paddingVertical: 12 },
  backButton: { padding: 8 },
  cartButton: { position: 'relative', padding: 8 },
  cartBadge: { position: 'absolute', top: 2, right: 2, backgroundColor: COLORS.primary, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  cartBadgeText: { color: COLORS.white, fontSize: 11, fontWeight: 'bold' },
  restaurantHeader: { backgroundColor: COLORS.white, padding: SIZES.padding, marginBottom: 16 },
  imagePlaceholder: { height: 180, backgroundColor: COLORS.primaryLight, borderRadius: SIZES.radius, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  restaurantInfo: {},
  restaurantName: { ...FONTS.h2, color: COLORS.black, marginBottom: 4 },
  cuisineText: { ...FONTS.body2, color: COLORS.gray, marginBottom: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { ...FONTS.body2, fontWeight: '600', marginLeft: 4 },
  dotSeparator: { marginHorizontal: 8, color: COLORS.gray },
  deliveryText: { ...FONTS.body2, color: COLORS.gray, marginLeft: 4 },
  feeText: { ...FONTS.body2, color: COLORS.primary },
  menuSection: { backgroundColor: COLORS.white, paddingHorizontal: SIZES.padding, paddingVertical: 16, marginBottom: 12 },
  sectionTitle: { ...FONTS.h3, color: COLORS.black, marginBottom: 16 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  menuItemInfo: { flex: 1, marginRight: 16 },
  popularBadge: { backgroundColor: COLORS.primaryLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 4 },
  popularText: { ...FONTS.caption, color: COLORS.primary, fontWeight: '600' },
  menuItemName: { ...FONTS.h4, color: COLORS.black, marginBottom: 4 },
  menuItemDesc: { ...FONTS.body3, color: COLORS.gray, marginBottom: 6 },
  menuItemPrice: { ...FONTS.h4, color: COLORS.black },
  addButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  viewCartButton: { backgroundColor: COLORS.primary, marginHorizontal: SIZES.padding, marginBottom: 16, paddingVertical: 16, borderRadius: SIZES.radius, alignItems: 'center' },
  viewCartText: { color: COLORS.white, ...FONTS.h4 },
});
