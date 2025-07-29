import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {  Property } from "../types";
import { getMarkerIcon } from "../utils/mapHelpers";
import MapPopup from "./MapPopup";

type Props = {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect: (selection: Property) => void;
};

export default function Map({
  properties,
  selectedProperty,
  onPropertySelect,
}: Props) {
  const [bounds, setBounds] = useState<[number, number][] | null>(null);

  useEffect(() => {
    // Fix Leaflet marker images
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
    // Compute bounds from valid properties
    const valid = properties.filter(
      p => typeof p.latitude === "number" && typeof p.longitude === "number"
    );

    if (valid.length > 0) {
      const latlngs = valid.map(
        p => [p.latitude!, p.longitude!] as [number, number]
      );
      setBounds(latlngs);
    } else {
      setBounds(null);
    }
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
      <MapContainer bounds={bounds} boundsOptions={{ padding: [50, 50] }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {properties
          .filter(
            p =>
              typeof p.latitude === "number" && typeof p.longitude === "number"
          )
          .map(property => (
            <Marker
              key={property.id}
              position={[property.latitude, property.longitude]}
              icon={getMarkerIcon(property, selectedProperty)}
            >
              <Popup>
                <MapPopup
                  key={property.id}
                  property={property}
                  onPropertySelect={onPropertySelect}
                />
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
