import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONTS, SIZES, SHADOWS } from '../../constants/theme';
import { searchRestaurants } from '../../store/slices/restaurantSlice';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.restaurants);
  const recentSearches = ['Pizza', 'Sushi', 'Burgers', 'Indian', 'Chinese', 'Thai'];

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) dispatch(searchRestaurants(text));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={COLORS.gray} />
        <TextInput style={styles.searchInput} placeholder="Search for restaurants or dishes" value={query} onChangeText={handleSearch} autoFocus />
        {query.length > 0 && <TouchableOpacity onPress={() => setQuery('')}><Ionicons name="close-circle" size={20} color={COLORS.gray} /></TouchableOpacity>}
      </View>

      {query.length === 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentTags}>
            {recentSearches.map((item) => (
              <TouchableOpacity key={item} style={styles.recentTag} onPress={() => handleSearch(item)}>
                <Text style={styles.recentTagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <FlatList data={searchResults} keyExtractor={(item) => item._id} renderItem={({ item }) => (
        <TouchableOpacity style={styles.resultItem} onPress={() => navigation.navigate('Restaurant', { restaurant: item })}>
          <View style={styles.resultIcon}><Ionicons name="restaurant" size={24} color={COLORS.primary} /></View>
          <View style={styles.resultInfo}>
            <Text style={styles.resultName}>{item.name}</Text>
            <Text style={styles.resultCuisine}>{item.cuisine} - {item.deliveryTime}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      )} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: SIZES.padding, marginVertical: 12, paddingHorizontal: 16, paddingVertical: 12, borderRadius: SIZES.radius, ...SHADOWS.light },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  recentSection: { paddingHorizontal: SIZES.padding, marginTop: 16 },
  sectionTitle: { ...FONTS.h4, color: COLORS.black, marginBottom: 12 },
  recentTags: { flexDirection: 'row', flexWrap: 'wrap' },
  recentTag: { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, marginBottom: 10, ...SHADOWS.light },
  recentTagText: { ...FONTS.body2, color: COLORS.darkGray },
  resultItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: SIZES.padding, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  resultIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  resultInfo: { flex: 1 },
  resultName: { ...FONTS.h4, color: COLORS.black },
  resultCuisine: { ...FONTS.body3, color: COLORS.gray, marginTop: 2 },
});
