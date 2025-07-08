import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Property, SavedScenario } from "../types";
import { properties } from "../data/mockData";
import {
  Map as MapIcon,
  Grid,
  Building2,
  Search,
  Plus,
  Filter,
  MapPin,
  TrendingUp,
  ChevronDown,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import Map from "../components/Map";
import PropertyList from "../components/PropertyList";
import PropertyAnalysisDialog from "../components/PropertyAnalysisDialog";
import CustomPropertyForm from "../components/CustomPropertyForm";
import { AnimatePresence, motion } from "framer-motion";

interface PropertyExplorerProps {
  onSaveScenario: (scenario: SavedScenario) => void;
}

export default function PropertyExplorer({
  onSaveScenario,
}: PropertyExplorerProps) {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const showToast = useToastStore(state => state.showToast);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    propertyType: "all",
    minSquareFeet: 0,
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters =
        property.renovationCost >= filters.minPrice &&
        property.renovationCost <= filters.maxPrice &&
        property.sqft >= filters.minSquareFeet &&
        (filters.propertyType === "all" || property.zoning.toLowerCase() === filters.propertyType);
      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters]);

  const handlePropertySelect = useCallback(
    (property: Property) => {
      if (!isAuthenticated) {
        showToast("Please sign in to analyze properties", "info");
        navigate("/login", { state: { from: "/platform" } });
        return;
      }
      setSelectedProperty(property);
    },
    [isAuthenticated, navigate, showToast]
  );

  const requestAnalysisClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    setShowCustomForm(true);
  };

  const getFilterTitle = (filter: string) => {
    switch (filter) {
      case "minPrice":
        return "Min Price";
      case "maxPrice":
        return "Max Price";
      case "propertyType":
        return "Type";
      case "minSquareFeet":
        return "Min SQFT";
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-br from-gray-50 via-white to-emerald-50/20">
      {/* Enhanced Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="p-4 md:p-6 ">
          {/* Title and Stats Row */}
          <div className="mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-100 rounded-xl p-3">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Property Explorer
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Discover and analyze commercial properties in real-time
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="bg-blue-100 rounded-full p-1">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {filteredProperties.length}
                    </span>{" "}
                    Properties
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="bg-green-100 rounded-full p-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-600">
                    <span className="font-semibold text-gray-900">Live</span>{" "}
                    Analysis
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <button
                onClick={() => requestAnalysisClick()}
                className="flex-1 lg:flex-none btn-brand flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Request Analysis</span>
              </button>

              {/* Enhanced View Toggle */}
              <div className="glass-card p-1 flex space-x-1">
                <button
                  onClick={() => setShowMap(true)}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    showMap
                      ? "bg-emerald-500 text-white shadow-md"
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                >
                  <MapIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    !showMap
                      ? "bg-emerald-500 text-white shadow-md"
                      : "hover:bg-white/50 text-gray-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search properties by address, neighborhood, or building type..."
                className="input-field pl-12 pr-4 py-4 text-lg"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-4 rounded-xl  transition-all duration-200 shadow-sm hover:shadow-md ${
                showFilters
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 hover:bg-gray-50 text-gray-700 border border-gray-300"
              }`}
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Active Filter Tags */}
            {Object.entries(filters).map(
              ([key, value]) =>
                value !== "all" &&
                value !== 0 && (
                  <motion.span
                    key={key}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-2 text-xs bg-blue-100 text-blue-800 rounded-xl flex items-center space-x-1 border border-blue-200"
                  >
                    <span>
                      {getFilterTitle(key)}: {value}
                    </span>
                    <button
                      onClick={() =>
                        setFilters(prev => ({
                          ...prev,
                          [key]: key === "propertyType" ? "all" : 0,
                        }))
                      }
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.span>
                )
            )}
          </div>
          {/* Enhanced Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/50 shadow-sm"
              >
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Range
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full sm:w-1/2 px-3 py-1 border rounded"
                        value={filters.minPrice}
                        onChange={e =>
                          setFilters({
                            ...filters,
                            minPrice: Number(e.target.value),
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full sm:w-1/2 px-3 py-1 border rounded"
                        value={filters.maxPrice}
                        onChange={e =>
                          setFilters({
                            ...filters,
                            maxPrice: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      className="w-full px-3 py-1 border rounded"
                      value={filters.propertyType}
                      onChange={e =>
                        setFilters({ ...filters, propertyType: e.target.value })
                      }
                    >
                      <option value="all">All</option>
                      <option value="commercial">Commercial</option>
                      <option value="mixed-use">Mixed-Use</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Square Feet
                    </label>
                    <input
                      type="number"
                      placeholder="Min sqft"
                      className="w-full px-3 py-1 border rounded"
                      value={filters.minSquareFeet}
                      onChange={e =>
                        setFilters({
                          ...filters,
                          minSquareFeet: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-0 overflow-hidden">
        {showMap ? (
          <>
            {/* Map Section with Enhanced Border */}
            <div className="col-span-1 lg:col-span-3 relative h-[400px] lg:h-auto">
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-tl-2xl lg:rounded-none border border-gray-200/50">
                <Map
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            </div>

            {/* Property List Section with Enhanced Styling */}
            <div className="col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-sm border-t lg:border-l border-gray-200/50 lg:rounded-tr-2xl overflow-hidden">
              <div className="h-full overflow-auto">
                <PropertyList
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            </div>
          </>
        ) : (
          /* Grid View with Enhanced Container */
          <div className="col-span-1 lg:col-span-5 bg-white/80 backdrop-blur-sm overflow-hidden rounded-t-2xl border border-gray-200/50">
            <div className="h-full overflow-auto">
              <div className="p-4 border-b border-gray-200/50 bg-white/50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Grid className="w-5 h-5 text-emerald-600" />
                  <span>All Properties ({filteredProperties.length})</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive list view of all available properties
                </p>
              </div>
              <PropertyList
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
              />
            </div>
          </div>
        )}
      </div>

      {selectedProperty && (
        <PropertyAnalysisDialog
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSave={onSaveScenario}
        />
      )}

      <CustomPropertyForm
        open={showCustomForm}
        onOpenChange={setShowCustomForm}
      />
    </div>
  );
}
