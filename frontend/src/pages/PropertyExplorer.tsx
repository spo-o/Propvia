import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FilterType, Property, SavedScenario } from "../types";
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
  const [allFilters, setAllFilters] = useState<FilterType[]>([
    { key: "minPrice", value: 0, title: "Min Price", isActive: false },
    { key: "maxPrice", value: 0, title: "Max Price", isActive: false },
    { key: "propertyType", value: "all", title: "Type", isActive: false },
    { key: "minSquareFeet", value: 0, title: "Min SQFT", isActive: false },
  ]);

  const filteredProperties = useMemo(() => {
    let newProperties = [...properties];
    //check matches for the search term
    if(searchTerm){
      newProperties = newProperties.filter(p => p.address.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    // check matches for each filter
    allFilters.forEach(filter => {
      if (filter.isActive) {
        switch (filter.key) {
          case "minPrice":
            newProperties = newProperties.filter(
              property => property.renovationCost >= (filter.value as number)
            );
            break;
          case "maxPrice":
            newProperties = newProperties.filter(
              property => property.renovationCost <= (filter.value as number)
            );
            break;
          case "propertyType":
            if (filter.value !== "all") {
              newProperties = newProperties.filter(
                property =>
                  property.zoning.toLowerCase() === (filter.value as string)
              );
            }
            break;
          case "minSquareFeet":
            newProperties = newProperties.filter(
              property => property.sqft >= (filter.value as number)
            );
            break;
          default:
            break;
        }
      }
    });
    return newProperties;
  }, [searchTerm, allFilters]);

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

  const removeFilter = (filter: FilterType) => {
    const newFilters = [...allFilters]
    // find the index of the filter that was disabled
    const index = newFilters.findIndex(f => f.key === filter.key)
    // reset the filter to the default values
    if(newFilters[index].key === 'propertyType'){
      newFilters[index].value = 'all'
    } else {
      newFilters[index].value = 0
    }
    newFilters[index].isActive = false
    setAllFilters(newFilters)
  }

  const activateFilter = (filter: FilterType, value: string | number) => {
    const newFilters = [...allFilters];
    // find the index of the filter that was changed
    const index = newFilters.findIndex(f => f.key === filter.key);
    newFilters[index].value = value
    newFilters[index].isActive = true
    setAllFilters(newFilters)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Modern Compact Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
        <div className="px-6 py-4">
          {/* Streamlined Header Row */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl p-3 shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Property Explorer</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">{filteredProperties.length}</span> properties
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compact Action Bar */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => requestAnalysisClick()}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Request Analysis</span>
              </button>

              {/* Modern View Toggle */}
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  onClick={() => setShowMap(true)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    showMap
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Map</span>
                </button>
                <button
                  onClick={() => setShowMap(false)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                    !showMap
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span className="text-sm font-medium">Grid</span>
                </button>
              </div>
            </div>
          </div>

          {/* Streamlined Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by address, neighborhood, or property type..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 border ${
                showFilters
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Active Filter Pills */}
          {allFilters.some(filter => filter.isActive) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {allFilters.map(
                filter =>
                  filter.isActive && (
                    <motion.span
                      key={filter.key}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg flex items-center space-x-2 border border-blue-200"
                    >
                      <span className="font-medium">{filter.title}:</span>
                      <span>{filter.value}</span>
                      <button
                        onClick={() => removeFilter(filter)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  )
              )}
            </div>
          )}

          {/* Compact Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                      <div className="space-y-2">
                        <input
                          type="number"
                          placeholder="Min price"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          value={allFilters[0].value || ''}
                          onChange={e => activateFilter(allFilters[0], Number(e.target.value))}
                        />
                        <input
                          type="number"
                          placeholder="Max price"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          value={allFilters[1].value || ''}
                          onChange={e => activateFilter(allFilters[1], Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        value={allFilters[2].value}
                        onChange={e => activateFilter(allFilters[2], e.target.value)}
                      >
                        <option value="all">All Types</option>
                        <option value="commercial">Commercial</option>
                        <option value="mixed-use">Mixed-Use</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Min Square Feet</label>
                      <input
                        type="number"
                        placeholder="Min sqft"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        value={allFilters[3].value || ''}
                        onChange={e => activateFilter(allFilters[3], Number(e.target.value))}
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setAllFilters(prev => prev.map(f => ({ ...f, isActive: false, value: f.key === 'propertyType' ? 'all' : 0 })));
                        }}
                        className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modern Content Layout */}
      <div className="flex-1 overflow-hidden">
        {showMap ? (
          /* Map + Sidebar Layout */
          <div className="h-full flex">
            {/* Map Container */}
            <div className="flex-1 relative">
              <div className="absolute inset-0">
                <Map
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            </div>

            {/* Property Sidebar */}
            <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <span>Properties ({filteredProperties.length})</span>
                </h3>
                <p className="text-sm text-gray-600 mt-1">Click on map markers or browse below</p>
              </div>
              <div className="flex-1 overflow-auto">
                <PropertyList
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Full Grid Layout */
          <div className="h-full bg-white">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Grid className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">All Properties</h3>
                    <p className="text-sm text-gray-600">Comprehensive grid view of {filteredProperties.length} properties</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Updated just now
                </div>
              </div>
            </div>
            <div className="h-[calc(100%-120px)] overflow-auto">
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
