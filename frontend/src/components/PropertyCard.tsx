import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  Building2,
  Calendar,
  ChevronDown,
  DollarSign,
  FileText,
  Info,
  Lock,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  Users2,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useAuthStore } from "../store/authStore";
import { Property } from "../types";

type Props = {
  property: Property;
  index: number;
  selectedProperty: Property | null;
  handleShare: (property: Property, e: React.MouseEvent) => void;
  handleViewReport: (e: React.MouseEvent, propertyId: string) => void;
  handleAnalyzeProperty: (e: React.MouseEvent, property: Property) => void;
};

export default function PropertyCard({
  property,
  index,
  selectedProperty,
  handleShare,
  handleViewReport,
  handleAnalyzeProperty,
}: Props) {
  const { isAuthenticated } = useAuthStore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={clsx(
        "relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group border border-gray-100 overflow-hidden",
        selectedProperty?.id === property.id
          ? "ring-2 ring-blue-500 shadow-blue-100"
          : "hover:border-gray-200"
      )}
      onClick={e => handleAnalyzeProperty(e, property)}
    >
      {/* Property Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.thumbnail}
          alt={property.address}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Share Button */}
        <button
          onClick={e => handleShare(property, e)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group/share"
        >
          <Share2 className="w-4 h-4 text-gray-600 group-hover/share:text-blue-600 transition-colors" />
        </button>

        {/* Property Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 rounded-full border border-white/20">
            {property.zoning}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="text-xs text-gray-600">Est. Cost</div>
            <div className="text-lg font-bold text-gray-900">${property.renovationCost.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Property Content */}
      <div className="p-6">
        {/* Header Info */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
            {property.address}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {property.sqft.toLocaleString()} sqft
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Built {property.yearBuilt}
            </span>
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-blue-500 rounded-lg">
                <Target className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Opportunity</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {property.opportunityScore.overall}%
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-500 mb-1">Growth</div>
                <div className="font-semibold text-gray-700">{property.opportunityScore.growth}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">ROI</div>
                <div className="font-semibold text-gray-700">{property.opportunityScore.roi}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">Market</div>
                <div className="font-semibold text-gray-700">{property.opportunityScore.market}%</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-purple-500 rounded-lg">
                <Users2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Community</span>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {property.communityScore.overall}%
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-500 mb-1">Diversity</div>
                <div className="font-semibold text-gray-700">{property.communityScore.diversity}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">Engage</div>
                <div className="font-semibold text-gray-700">{property.communityScore.engagement}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 mb-1">Services</div>
                <div className="font-semibold text-gray-700">{property.communityScore.services}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">{property.familyPercentage}% families</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">High potential</span>
            </div>
          </div>
        </div>

        {/* Expandable Overview */}
        <details className="mb-6 group/details">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 p-3 bg-gray-50 rounded-xl transition-all duration-200 group-hover/details:bg-gray-100">
            <span>Building Overview</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open/details:rotate-180" />
          </summary>
          <div className="mt-3 p-4 bg-gray-50/50 rounded-xl space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">{property.buildingOverview.description}</p>
            <div className="space-y-2">
              {property.buildingOverview.highlights.slice(0, 3).map((highlight, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </details>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={e => handleAnalyzeProperty(e, property)}
          >
            {isAuthenticated ? (
              <>
                <Target className="w-4 h-4" />
                <span>Analyze Property</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Sign in to Analyze</span>
              </>
            )}
          </button>
          
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  onClick={e => handleViewReport(e, property.id)}
                >
                  <FileText className="w-5 h-5 text-gray-600" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm z-50 shadow-lg"
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
  );
}
