import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, SavedScenario } from '../types';
import { properties } from '../data/mockData';
import { Map as MapIcon, Grid, Building2, Search, Plus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';
import Map from '../components/Map';
import PropertyList from '../components/PropertyList';
import PropertyAnalysisDialog from '../components/PropertyAnalysisDialog';
import CustomPropertyForm from '../components/CustomPropertyForm';

interface PropertyExplorerProps {
  onSaveScenario: (scenario: SavedScenario) => void;
}

export default function PropertyExplorer({ onSaveScenario }: PropertyExplorerProps) {
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const showToast = useToastStore(state => state.showToast);

  const filteredProperties = useMemo(() => {
    return properties.filter(property => 
      property.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handlePropertySelect = useCallback((property: Property) => {
    if (!isAuthenticated) {
      showToast('Please sign in to analyze properties', 'info');
      navigate('/login', { state: { from: '/platform' } });
      return;
    }
    setSelectedProperty(property);
  }, [isAuthenticated, navigate, showToast]);

  const requestAnalysisClick = () => {
    if(!isAuthenticated){
      navigate("/login", { replace: true });
      return
    }
    setShowCustomForm(true);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Property Explorer</h1>
            <p className="text-gray-600 mt-1">
              Discover and analyze commercial properties in real-time
            </p>
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button
              onClick={() => requestAnalysisClick()}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600"
            >
              <Plus className="w-5 h-5" />
              <span>Request Analysis</span>
            </button>
            <div className="bg-white rounded-lg shadow-lg p-1 flex space-x-1">
              <button
                onClick={() => setShowMap(true)}
                className={`p-2 rounded transition-colors ${showMap ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <MapIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowMap(false)}
                className={`p-2 rounded transition-colors ${!showMap ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties by address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-0 ">
        {showMap ? (
          <>
            <div className="col-span-1 lg:col-span-3 relative h-[300px] lg:h-auto">
              <Map
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
              />
            </div>
            <div className="col-span-1 lg:col-span-2 bg-white border-t lg:border-l overflow-auto">
              <PropertyList
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
              />
            </div>
          </>
        ) : (
          <div className="col-span-1 lg:col-span-5 bg-white overflow-auto">
            <PropertyList
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
            />
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