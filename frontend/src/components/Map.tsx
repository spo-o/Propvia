import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Property } from '../types';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';
import { getValidProperties, getBounds, getMarkerIcon } from '../utils/mapHelpers';
// import { fetchAllProperties } from '../api/map';





interface MapProps {
  properties: Property[]; // Backend Logic Found: Property data fetched from backend
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

export default function Map({ properties, selectedProperty, onPropertySelect }: MapProps) {
  useEffect(() => {
    // Fix Leaflet icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Calculate bounds for all properties
  const validProperties = getValidProperties(properties);
  const bounds = getBounds(properties);

  return (
    <div className="relative h-full">
      <style>
        {`
          .leaflet-container {
            height: 100%;
            width: 100%;
            z-index: 0;
          }
          .custom-marker {
            background: none;
            border: none;
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
        // Backend Logic Found: Rendering map markers using backend property data
        {properties.map((property) => {
          if (typeof property.latitude !== 'number' || typeof property.longitude !== 'number') {
            return null;
          }

          return (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude]}
              icon={getMarkerIcon(property, selectedProperty)}
              eventHandlers={{
                click: () => onPropertySelect(property),
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{property.address}</h3>
                  <p className="text-sm">{property.sqft} sqft</p>
                  <p className="text-sm">${property.renovationCost.toLocaleString()}</p>
                  <button
                    onClick={() => onPropertySelect(property)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}