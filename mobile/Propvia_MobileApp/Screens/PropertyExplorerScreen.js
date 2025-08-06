import { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTheme } from '../ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function PropertyExplorerScreen() {
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // Fetch properties from Supabase REST API
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const SUPABASE_URL = 'https://dvqjatjbjgcmosvuvhzj.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2cWphdGpiamdjbW9zdnV2aHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5ODE1MTEsImV4cCI6MjA1OTU1NzUxMX0.VRt9c3LyWZSJobnp8t44b7sPnFAGhquhSiraCArA6xU';

      const res = await fetch(`${SUPABASE_URL}/rest/v1/liveproperties?select=*`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      const data = await res.json();
      setProperties(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Supabase REST fetch error:', error);
      setProperties([]);
    }
    setLoading(false);
  };

  // Refresh when page is focused (entered or re-entered)
  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [])
  );

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

      {/* Search Bar with Refresh Button */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#5D6A75" style={styles.searchIcon} />
        <TextInput
          placeholder="Search properties by address..."
          placeholderTextColor="#5D6A75"
          style={[styles.searchInput, { color: colors.text }]}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity onPress={fetchProperties} style={{ marginLeft: 8 }}>
          <Ionicons name="refresh" size={22} color="#5D6A75" />
        </TouchableOpacity>
      </View>

      {/* Embedded Map showing all markers */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 42.3314,
          longitude: -83.0458,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
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