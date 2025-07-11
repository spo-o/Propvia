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
    <div className="h-full flex flex-col bg-gray-50/30">
      {/* Modern Property Cards Section */}
      <div className="flex-1 overflow-auto">
        {paginatedProperties.length > 0 ? (
          <div className="p-6 space-y-6">
            {paginatedProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                handleAnalyzeProperty={handleAnalyzeProperty}
                handleShare={handleShare}
                handleViewReport={handleViewReport}
                index={index}
                property={property}
                selectedProperty={selectedProperty}
              />
            ))}
          </div>
        ) : (
          /* Improved Empty State */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-3 max-w-sm">
              <div className="bg-gray-100 rounded-2xl p-4 w-16 h-16 mx-auto flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No Properties Found</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {searchTerm ? 
                    `No matches for "${searchTerm}". Try different keywords.` :
                    'No properties available with the current filters.'
                  }
                </p>
              </div>
              {(searchTerm || Object.values(filters).some(v => v !== 'all' && v !== 0)) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ minPrice: 0, maxPrice: 1000000, propertyType: 'all', minSquareFeet: 0 });
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modern Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200/60 bg-white/95 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium">
              {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)} of {filteredProperties.length}
            </span>
            <div className="hidden sm:flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page;
                if (totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      page === currentPage 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modern Share Dialog */}
      <Dialog.Root open={!!selectedPropertyForShare} onOpenChange={() => setSelectedPropertyForShare(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md z-50">
            <Dialog.Title className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
              <div className="bg-blue-100 rounded-xl p-2">
                <Share2 className="w-5 h-5 text-blue-600" />
              </div>
              <span>Share Property</span>
            </Dialog.Title>
            
            {selectedPropertyForShare && (
              <div className="space-y-4">
                {/* Compact Property Preview */}
                <div className="bg-gray-50 rounded-xl p-3 border">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedPropertyForShare.thumbnail}
                      alt={selectedPropertyForShare.address}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{selectedPropertyForShare.address}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedPropertyForShare.sqft.toLocaleString()} sqft • {selectedPropertyForShare.zoning}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => copyShareLink(selectedPropertyForShare)}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Copy Share Link</span>
                  </button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <span className="text-lg">📧</span>
                      <span className="text-sm">Email</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <span className="text-lg">💬</span>
                      <span className="text-sm">Message</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}