import L from 'leaflet';
import { Property, MapProperty } from '../types';

export function getValidProperties(properties: (Property | MapProperty)[]): (Property | MapProperty)[] {
  return properties.filter(
    (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number'
  );
}

export function getBounds(properties: (Property | MapProperty)[]): [number, number][] | null {
  const latlngs = properties
    .filter((p) => typeof p.latitude === 'number' && typeof p.longitude === 'number')
    .map((p) => [p.latitude!, p.longitude!]) as [number, number][];

  if (latlngs.length === 0) {
    return null;
  }

  return latlngs;
}



export function getMarkerIcon(property: Property, selectedProperty?: Property | null): L.DivIcon {
  const isSelected = selectedProperty?.id === property.id;
  const colorClass = property.zoning === 'Commercial' ? 'bg-red-500' : 'bg-purple-500';

  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="w-6 h-6 rounded-full ${colorClass} border-2 border-white shadow-lg ${
      isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
    }"></div>`,
  });
}
