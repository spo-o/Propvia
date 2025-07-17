import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

// Sample mock data with lat/lng
const mockProperties = [
  { id: '1', address: '123 Main St', lat: 40.7128, lng: -74.0060 },
  { id: '2', address: '456 Elm Ave', lat: 34.0522, lng: -118.2437 },
  { id: '3', address: '789 Oak Blvd', lat: 41.8781, lng: -87.6298 },
];

export default function PropertyExplorerScreen() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const mapRef = useRef(null);

  const filteredProperties = mockProperties.filter(property =>
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: property.lat,
        longitude: property.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Property Explorer</Text>
      <Text style={[styles.subtitle, { color: colors.description }]}>
        Discover and analyze commercial properties
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#5D6A75" style={styles.searchIcon} />
        <TextInput
          placeholder="Search properties by address..."
          placeholderTextColor="#5D6A75"
          style={[styles.searchInput, { color: colors.text }]}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Embedded Map showing all markers */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 39.8283,
          longitude: -98.5795,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
      >
        {filteredProperties.map((property) => (
          <Marker
            key={property.id}
            coordinate={{ latitude: property.lat, longitude: property.lng }}
            title={property.address}
            pinColor={selectedProperty?.id === property.id ? 'blue' : 'red'}
          />
        ))}
      </MapView>

      {/* Property List */}
      <FlatList
        data={filteredProperties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectProperty(item)}>
            <View style={styles.propertyItem}>
              <Ionicons name="home-outline" size={20} color={colors.text} style={styles.propertyIcon} />
              <Text style={[styles.propertyText, { color: colors.text }]}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.propertyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#B8C4C2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  map: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  propertyList: {
    paddingBottom: 20,
  },
  propertyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  propertyIcon: {
    marginRight: 10,
  },
  propertyText: {
    fontSize: 16,

  },
});