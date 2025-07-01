import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, SavedScenario } from '../types';
import { motion } from 'framer-motion';
import { 
  Building2, DollarSign, Users, Calendar, Shield, TrendingUp, Search, 
  SlidersHorizontal, Share2, FileText, Target, Users2, Star, ChevronDown,
  ExternalLink, Lock, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useAuthStore } from '../store/authStore';
import { useToastStore } from '../store/toastStore';

interface PropertyListProps {
  properties: Property[];
  selectedProperty: Property | null;
  onPropertySelect: (property: Property) => void;
}

const ITEMS_PER_PAGE = 5;

export default function PropertyList({ properties, selectedProperty, onPropertySelect }: PropertyListProps) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const showToast = useToastStore(state => state.showToast);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPropertyForShare, setSelectedPropertyForShare] = useState<Property | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    propertyType: 'all',
    minSquareFeet: 0,
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = 
        property.renovationCost >= filters.minPrice &&
        property.renovationCost <= filters.maxPrice &&
        property.sqft >= filters.minSquareFeet &&
        (filters.propertyType === 'all' || property.zoning.toLowerCase() === filters.propertyType);
      return matchesSearch && matchesFilters;
    });
  }, [properties, searchTerm, filters]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleShare = async (property: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPropertyForShare(property);
  };

  const copyShareLink = async (property: Property) => {
    const shareUrl = `${window.location.origin}/property/${property.id}`;
    await navigator.clipboard.writeText(shareUrl);
    setSelectedPropertyForShare(null);
    showToast('Share link copied to clipboard!', 'success');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleViewReport = (e: React.MouseEvent, propertyId: string) => {
    e.stopPropagation();
    navigate(`/reports/${propertyId}`);
  };

  const handleAnalyzeProperty = (e: React.MouseEvent, property: Property) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      showToast('Please sign in to analyze properties', 'info');
      navigate('/login', { state: { from: '/platform' } });
      return;
    }
    onPropertySelect(property);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
          
          {Object.entries(filters).map(([key, value]) => (
            value !== 'all' && value !== 0 && (
              <motion.span
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {key}: {value}
              </motion.span>
            )
          ))}
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 bg-gray-50 p-4 rounded-lg"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full sm:w-1/2 px-3 py-1 border rounded"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full sm:w-1/2 px-3 py-1 border rounded"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="w-full px-3 py-1 border rounded"
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              >
                <option value="all">All</option>
                <option value="commercial">Commercial</option>
                <option value="mixed-use">Mixed-Use</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Square Feet</label>
              <input
                type="number"
                placeholder="Min sqft"
                className="w-full px-3 py-1 border rounded"
                value={filters.minSquareFeet}
                onChange={(e) => setFilters({ ...filters, minSquareFeet: Number(e.target.value) })}
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-4 p-4">
          {paginatedProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                'rounded-lg overflow-hidden shadow-md transition-all',
                selectedProperty?.id === property.id
                  ? 'ring-2 ring-blue-500 scale-[1.02]'
                  : 'hover:scale-[1.01]'
              )}
            >
              <div className="relative">
                <img
                  src={property.thumbnail}
                  alt={property.address}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={(e) => handleShare(property, e)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-4 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <h3 className="font-semibold text-lg">{property.address}</h3>
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full whitespace-nowrap">
                    {property.zoning}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Opportunity Score</span>
                      </div>
                      <span className={clsx(
                        'text-lg font-bold',
                        getScoreColor(property.opportunityScore.overall)
                      )}>
                        {property.opportunityScore.overall}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth</span>
                        <span>{property.opportunityScore.growth}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ROI</span>
                        <span>{property.opportunityScore.roi}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Market</span>
                        <span>{property.opportunityScore.market}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Users2 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">Community Score</span>
                      </div>
                      <span className={clsx(
                        'text-lg font-bold',
                        getScoreColor(property.communityScore.overall)
                      )}>
                        {property.communityScore.overall}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Diversity</span>
                        <span>{property.communityScore.diversity}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Engagement</span>
                        <span>{property.communityScore.engagement}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Services</span>
                        <span>{property.communityScore.services}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm">{property.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">${property.renovationCost.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{property.familyPercentage}% families</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Built {property.yearBuilt}</span>
                  </div>
                </div>

                <details className="mb-4">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span>Building Overview</span>
                    <ChevronDown className="w-4 h-4" />
                  </summary>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-2">
                    <p className="text-sm text-gray-600">{property.buildingOverview.description}</p>
                    <div className="space-y-1">
                      {property.buildingOverview.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center space-x-2 text-sm">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </details>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={(e) => handleAnalyzeProperty(e, property)}
                  >
                    {isAuthenticated ? 'Analyze Property' : (
                      <div className="flex items-center justify-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Sign in to Analyze</span>
                      </div>
                    )}
                  </button>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <button
                          className="flex items-center justify-center p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                          onClick={(e) => handleViewReport(e, property.id)}
                        >
                          <FileText className="w-5 h-5 text-gray-600" />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-gray-900 text-white px-3 py-2 rounded text-sm"
                          sideOffset={5}
                        >
                          View Full Report
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="border-t p-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      <Dialog.Root open={!!selectedPropertyForShare} onOpenChange={() => setSelectedPropertyForShare(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Share Property
            </Dialog.Title>
            
            {selectedPropertyForShare && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedPropertyForShare.thumbnail}
                    alt={selectedPropertyForShare.address}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{selectedPropertyForShare.address}</h3>
                    <p className="text-sm text-gray-600">{selectedPropertyForShare.sqft.toLocaleString()} sqft</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => copyShareLink(selectedPropertyForShare)}
                    className="w-full flex items-center justify-center space-x-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <span>Copy Link</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}