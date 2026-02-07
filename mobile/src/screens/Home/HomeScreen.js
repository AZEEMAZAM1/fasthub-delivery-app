import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { fetchRestaurants, setSelectedCategory } from '../../store/slices/restaurantSlice';
import { selectCartCount } from '../../store/slices/cartSlice';

const { width } = Dimensions.get('window');

const SAMPLE_RESTAURANTS = [
  { _id: '1', name: 'Pizza Express', image: 'https://via.placeholder.com/300x200', cuisine: 'Italian', rating: 4.5, deliveryTime: '25-35 min', deliveryFee: 1.99, distance: '0.8 mi' },
  { _id: '2', name: 'Wagamama', image: 'https://via.placeholder.com/300x200', cuisine: 'Japanese', rating: 4.3, deliveryTime: '30-40 min', deliveryFee: 2.49, distance: '1.2 mi' },
  { _id: '3', name: 'Nando\'s', image: 'https://via.placeholder.com/300x200', cuisine: 'Portuguese', rating: 4.6, deliveryTime: '20-30 min', deliveryFee: 0.99, distance: '0.5 mi' },
  { _id: '4', name: 'Burger King', image: 'https://via.placeholder.com/300x200', cuisine: 'Burgers', rating: 4.1, deliveryTime: '15-25 min', deliveryFee: 1.49, distance: '0.3 mi' },
  { _id: '5', name: 'Dishoom', image: 'https://via.placeholder.com/300x200', cuisine: 'Indian', rating: 4.8, deliveryTime: '35-45 min', deliveryFee: 2.99, distance: '1.5 mi' },
  { _id: '6', name: 'Five Guys', image: 'https://via.placeholder.com/300x200', cuisine: 'Burgers', rating: 4.4, deliveryTime: '20-30 min', deliveryFee: 1.99, distance: '0.7 mi' },
];

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector((state) => state.restaurants);
  const cartCount = useSelector(selectCartCount);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => { dispatch(fetchRestaurants()); }, []);

  const renderCategoryItem = (category) => (
    <TouchableOpacity key={category} style={[styles.categoryItem, selectedCategory === category && styles.categoryItemActive]} onPress={() => dispatch(setSelectedCategory(category))}>
      <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text>
    </TouchableOpacity>
  );

  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard} onPress={() => navigation.navigate('Restaurant', { restaurant: item })}>
      <View style={styles.cardImageContainer}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="restaurant" size={40} color={COLORS.primary} />
        </View>
        <View style={styles.deliveryBadge}>
          <Text style={styles.deliveryBadgeText}>{item.deliveryTime}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <View style={styles.cardInfo}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.star} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.cuisineText}>{item.cuisine}</Text>
          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>
        <Text style={styles.deliveryFeeText}>{item.deliveryFee === 0 ? 'Free delivery' : `Delivery fee ${item.deliveryFee}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Deliver to</Text>
          <TouchableOpacity style={styles.addressRow}>
            <Ionicons name="location" size={18} color={COLORS.primary} />
            <Text style={styles.address}>Current Location</Text>
            <Ionicons name="chevron-down" size={18} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={26} color={COLORS.black} />
          {cartCount > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cartCount}</Text></View>}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map(renderCategoryItem)}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Near You</Text>
          <FlatList data={SAMPLE_RESTAURANTS} renderItem={renderRestaurantCard} keyExtractor={(item) => item._id} scrollEnabled={false} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SIZES.padding, paddingVertical: 12 },
  greeting: { ...FONTS.body3, color: COLORS.gray },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  address: { ...FONTS.h4, color: COLORS.black, marginHorizontal: 4 },
  cartButton: { position: 'relative', padding: 8 },
  cartBadge: { position: 'absolute', top: 2, right: 2, backgroundColor: COLORS.primary, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  cartBadgeText: { color: COLORS.white, fontSize: 11, fontWeight: 'bold' },
  categoriesContainer: { paddingHorizontal: SIZES.padding, marginBottom: 16 },
  categoryItem: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, backgroundColor: COLORS.white, marginRight: 10, ...SHADOWS.light },
  categoryItemActive: { backgroundColor: COLORS.primary },
  categoryText: { ...FONTS.body2, color: COLORS.darkGray },
  categoryTextActive: { color: COLORS.white, fontWeight: '600' },
  section: { paddingHorizontal: SIZES.padding },
  sectionTitle: { ...FONTS.h3, color: COLORS.black, marginBottom: 16 },
  restaurantCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, marginBottom: 16, ...SHADOWS.light, overflow: 'hidden' },
  cardImageContainer: { position: 'relative' },
  imagePlaceholder: { height: 160, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
  deliveryBadge: { position: 'absolute', bottom: 10, left: 10, backgroundColor: COLORS.white, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  deliveryBadgeText: { ...FONTS.body3, fontWeight: '600' },
  cardContent: { padding: 14 },
  restaurantName: { ...FONTS.h4, color: COLORS.black, marginBottom: 6 },
  cardInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  ratingText: { ...FONTS.body3, fontWeight: '600', marginLeft: 4 },
  cuisineText: { ...FONTS.body3, color: COLORS.gray, marginRight: 12 },
  distanceText: { ...FONTS.body3, color: COLORS.gray },
  deliveryFeeText: { ...FONTS.body3, color: COLORS.primary },
});
