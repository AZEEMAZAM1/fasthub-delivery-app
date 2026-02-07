import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../../../constants';
import { fetchOrders } from '../../../store/slices/orderSlice';

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState('active');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchOrders());
    setRefreshing(false);
  };

  const activeOrders = orders.filter(
    (order) => ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status)
  );

  const pastOrders = orders.filter(
    (order) => ['delivered', 'cancelled'].includes(order.status)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return COLORS.warning;
      case 'confirmed':
        return COLORS.info;
      case 'preparing':
        return COLORS.primary;
      case 'out_for_delivery':
        return COLORS.success;
      case 'delivered':
        return COLORS.success;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'out_for_delivery':
        return 'On the way';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
    >
      <View style={styles.orderHeader}>
        <View style={styles.restaurantInfo}>
          <Image source={{ uri: item.restaurant.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
            <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <Text key={index} style={styles.orderItemText}>
            {orderItem.quantity}x {orderItem.name}
          </Text>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>+{item.items.length - 2} more items</Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
        <View style={styles.orderActions}>
          {item.status === 'delivered' && (
            <TouchableOpacity
              style={styles.reorderButton}
              onPress={() => handleReorder(item)}
            >
              <Ionicons name="refresh" size={16} color={COLORS.primary} />
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>View Details</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleReorder = (order) => {
    // Add items to cart and navigate
    navigation.navigate('Restaurant', { restaurantId: order.restaurant.id });
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons
        name={activeTab === 'active' ? 'receipt-outline' : 'time-outline'}
        size={80}
        color={COLORS.lightGray}
      />
      <Text style={styles.emptyTitle}>
        {activeTab === 'active' ? 'No Active Orders' : 'No Past Orders'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {activeTab === 'active'
          ? "You don't have any active orders right now"
          : "You haven't placed any orders yet"}
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('HomeTab')}
      >
        <Text style={styles.browseButtonText}>Browse Restaurants</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading && orders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past ({pastOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'active' ? activeOrders : pastOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { paddingHorizontal: SIZES.padding, paddingVertical: 16 },
  headerTitle: { ...FONTS.h2, color: COLORS.black },
  tabContainer: { flexDirection: 'row', paddingHorizontal: SIZES.padding, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: COLORS.lightGray },
  activeTab: { borderBottomColor: COLORS.primary },
  tabText: { ...FONTS.body3, color: COLORS.gray },
  activeTabText: { ...FONTS.h4, color: COLORS.primary },
  listContent: { paddingHorizontal: SIZES.padding, paddingBottom: 100 },
  orderCard: { backgroundColor: COLORS.white, borderRadius: SIZES.radius, padding: SIZES.padding, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  restaurantInfo: { flexDirection: 'row', flex: 1 },
  restaurantImage: { width: 50, height: 50, borderRadius: SIZES.radiusSmall },
  restaurantDetails: { marginLeft: 12, flex: 1 },
  restaurantName: { ...FONTS.h4, color: COLORS.black },
  orderDate: { ...FONTS.body4, color: COLORS.gray, marginTop: 4 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { ...FONTS.body4, fontWeight: '600' },
  orderItems: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  orderItemText: { ...FONTS.body3, color: COLORS.darkGray, marginBottom: 4 },
  moreItems: { ...FONTS.body4, color: COLORS.gray, fontStyle: 'italic' },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.lightGray },
  orderTotal: { ...FONTS.h4, color: COLORS.black },
  orderActions: { flexDirection: 'row', alignItems: 'center' },
  reorderButton: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  reorderText: { ...FONTS.body3, color: COLORS.primary, marginLeft: 4 },
  detailsButton: { flexDirection: 'row', alignItems: 'center' },
  detailsText: { ...FONTS.body3, color: COLORS.primary },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 60 },
  emptyTitle: { ...FONTS.h3, color: COLORS.black, marginTop: 16 },
  emptySubtitle: { ...FONTS.body3, color: COLORS.gray, textAlign: 'center', marginTop: 8, paddingHorizontal: 40 },
  browseButton: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: SIZES.radius, marginTop: 24 },
  browseButtonText: { ...FONTS.h4, color: COLORS.white },
});

export default OrdersScreen;
