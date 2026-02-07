import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import RestaurantScreen from '../screens/Restaurant/RestaurantScreen';
import CartScreen from '../screens/Cart/CartScreen';
import CheckoutScreen from '../screens/Cart/CheckoutScreen';
import OrderTrackingScreen from '../screens/Orders/OrderTrackingScreen';
import OrderHistoryScreen from '../screens/Orders/OrderHistoryScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Orders') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
        tabBarStyle: { paddingBottom: 8, paddingTop: 8, height: 65 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Orders" component={OrderHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={HomeTabs} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
