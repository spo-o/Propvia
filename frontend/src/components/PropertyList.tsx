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
import PropertyCard from './PropertyCard';

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

  const getFilterTitle = (filter: string) => {
    switch (filter) {
      case "minPrice":
        return "Min Price"
      case "maxPrice":
        return "Max Price"
      case "propertyType":
        return "Type"
      case "minSquareFeet":
        return "Min SQFT"
      default:
        break;
    }
  }

  return (
    <div className="h-full flex flex-col bg-white/50">
      {/* Enhanced Search and Filter Section */}
      <div className="p-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search properties by address, type, or features..."
            className="input-field pl-12 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filter Section */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
              showFilters 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Active Filter Tags */}
          {Object.entries(filters).map(([key, value]) => (
            value !== 'all' && value !== 0 && (
              <motion.span
                key={key}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-2 text-xs bg-blue-100 text-blue-800 rounded-xl flex items-center space-x-1 border border-blue-200"
              >
                <span>{getFilterTitle(key)}: {value}</span>
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, [key]: key === 'propertyType' ? 'all' : 0 }))}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            )
          ))}
        </div>

        {/* Enhanced Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-6 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200/50 shadow-sm"
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

      {/* Enhanced Property Cards Section */}
      <div className="flex-1 overflow-auto bg-white/30">
        {paginatedProperties.length > 0 ? (
          <div className="space-y-4 p-6">
            {paginatedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated hover:shadow-xl transition-all duration-300"
              >
                <PropertyCard
                  handleAnalyzeProperty={handleAnalyzeProperty}
                  handleShare={handleShare}
                  handleViewReport={handleViewReport}
                  index={index}
                  property={property}
                  selectedProperty={selectedProperty}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="text-center space-y-4">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                <Building2 className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 max-w-sm">
                  {searchTerm ? 
                    `No properties match "${searchTerm}". Try adjusting your search or filters.` :
                    'No properties available in this area. Try expanding your search criteria.'
                  }
                </p>
              </div>
              {(searchTerm || Object.values(filters).some(v => v !== 'all' && v !== 0)) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ minPrice: 0, maxPrice: 1000000, propertyType: 'all', minSquareFeet: 0 });
                  }}
                  className="btn-accent"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200/50 bg-white/80 backdrop-blur-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)} of {filteredProperties.length}
            </span>
            <div className="hidden sm:flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                    page === currentPage 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Share Dialog */}
      <Dialog.Root open={!!selectedPropertyForShare} onOpenChange={() => setSelectedPropertyForShare(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <div className="p-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                <div className="bg-emerald-100 rounded-xl p-2">
                  <Share2 className="w-6 h-6 text-emerald-600" />
                </div>
                <span>Share Property</span>
              </Dialog.Title>
              
              {selectedPropertyForShare && (
                <div className="space-y-6">
                  {/* Property Preview Card */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200/50">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedPropertyForShare.thumbnail}
                        alt={selectedPropertyForShare.address}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{selectedPropertyForShare.address}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedPropertyForShare.sqft.toLocaleString()} sqft • {selectedPropertyForShare.zoning}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm font-medium text-emerald-600">
                            ${selectedPropertyForShare.renovationCost.toLocaleString()}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Score: {selectedPropertyForShare.opportunityScore.overall}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Share Options */}
                  <div className="space-y-3">
                    <button
                      onClick={() => copyShareLink(selectedPropertyForShare)}
                      className="w-full btn-brand flex items-center justify-center space-x-3"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Copy Share Link</span>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                        <span className="text-xl">📧</span>
                        <span className="text-sm font-medium">Email</span>
                      </button>
                      <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200">
                        <span className="text-xl">💬</span>
                        <span className="text-sm font-medium">Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}