import L from 'leaflet';
import { Property } from '../types';

export function getValidProperties(properties: Property[]): Property[] {
  return properties.filter(
    (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number'
  );
}

export function getBounds(properties: Property[]): L.LatLngBounds {
  const valid = getValidProperties(properties);
  return valid.length > 0
    ? L.latLngBounds(valid.map((p) => [p.latitude, p.longitude]))
    : L.latLngBounds([[42.331429, -83.045753], [42.331429, -83.045753]]);
}

export function getMarkerIcon(property: Property, selectedProperty: Property | null): L.DivIcon {
  const isSelected = selectedProperty?.id === property.id;
  const colorClass = property.zoning === 'Commercial' ? 'bg-red-500' : 'bg-purple-500';

  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full ${colorClass} border-2 border-white shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
    }"></div>`,
  });
}
