import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MapProperty } from '../types';
import { getMarkerIcon } from '../utils/mapHelpers';

export default function Map() {
  const [properties, setProperties] = useState<MapProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null);
  const [bounds, setBounds] = useState<[number, number][][] | null>(null);

  useEffect(() => {
    // Fix Leaflet marker images
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    async function fetchProperties() {
      try {
        console.log('Fetching properties from backend...');
        const res = await fetch('/api/property?page=1&pageSize=100');
        const json = await res.json();
        const fetched: MapProperty[] = json.data || [];
        console.log('✅ Fetched properties:', fetched);

        setProperties(fetched);

        // Compute bounds from valid properties
        const valid = fetched.filter(
          (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number'
        );

        if (valid.length > 0) {
          const latlngs = valid.map((p) => [p.latitude!, p.longitude!] as [number, number]);
          setBounds(latlngs);
        } else {
          setBounds(null);
        }

      } catch (err) {
        console.error('❌ Error fetching properties:', err);
      }
    }

    fetchProperties();
  }, []);

  if (!bounds) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No properties to display on map.
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <style>
        {`
          .leaflet-container {
            height: 100%;
            width: 100%;
            z-index: 0;
          }
        `}
      </style>
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [50, 50] }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {properties
          .filter((p) => typeof p.latitude === 'number' && typeof p.longitude === 'number')
          .map((property) => (
            <Marker
              key={property.id}
              position={[property.latitude!, property.longitude!]}
              icon={getMarkerIcon(property, selectedProperty)}
              eventHandlers={{
                click: () => setSelectedProperty(property),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{property.address}</h3>
                  <p className="text-xs">
                  {property.sqft && property.sqft > 0
                    ? `${property.sqft.toLocaleString()} sqft`
                    : 'Sqft: N/A'}
                </p>
                <p className="text-xs font-medium">
                  {property.price && property.price > 0
                    ? `$${property.price.toLocaleString()}`
                    : 'Price: N/A'}
                </p>

                  {property.image && (
                    <img
                      src={property.image}
                      alt={property.address}
                      className="mt-2 rounded w-full h-32 object-cover"
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
