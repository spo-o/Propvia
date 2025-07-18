import { MapPin, Square, Wrench, Eye } from "lucide-react";
import { Property } from "../types";


type Props = {
  property: Property;
  onPropertySelect: (property: Property) => void;
}

export default function MapPopup({
  property,
  onPropertySelect,
}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-w-[250px] max-w-xs animate-fade-in-up">

      <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
        {property.address}
      </h3>

      <div className="space-y-2 text-gray-700 mb-4 border-t border-b border-gray-200 py-3">
        <p className="text-sm flex items-center">
          <Square className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className="font-medium text-gray-800">
            {property.sqft.toLocaleString() + " sqft"}
          </span>
        </p>

        <p className="text-sm flex items-center">
          <Wrench className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
          <span className="font-semibold text-red-600">
            ${property.renovationCost.toLocaleString()}
          </span>
          <span className="ml-1 text-gray-500">(Renovation)</span>
        </p>
      </div>

      <button
        onClick={() => onPropertySelect(property)}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Eye className="w-5 h-5 mr-2" />
        View Details
      </button>
    </div>
  );
}
