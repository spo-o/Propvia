import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function PropertyExplorerScreen() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]); // <-- NEW
  const [loading, setLoading] = useState(true);     // <-- NEW
  const mapRef = useRef(null);

  // Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://192.168.0.235:5050/api/property/live');
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []); // <-- Defensive assignment
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setProperties([]); // <-- Ensure it's always an array
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Use fetched properties instead of mock data
  const filteredProperties = Array.isArray(properties)
    ? properties.filter(property =>
        property.address?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
    if (mapRef.current && property.latitude && property.longitude) {
      mapRef.current.animateToRegion({
        latitude: property.latitude,
        longitude: property.longitude,
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
          property.latitude && property.longitude && (
            <Marker
              key={property.id}
              coordinate={{ latitude: property.latitude, longitude: property.longitude }}
              title={property.address}
              pinColor={selectedProperty?.id === property.id ? 'blue' : 'red'}
            />
          )
        ))}
      </MapView>

      {/* Loading indicator */}
      {loading && (
        <Text style={{ color: colors.text, textAlign: 'center', marginBottom: 10 }}>
          Loading properties...
        </Text>
      )}

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