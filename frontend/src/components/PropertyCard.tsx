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
    <div>
      <motion.div
        key={property.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={clsx(
          "rounded-lg overflow-hidden shadow-md transition-all",
          selectedProperty?.id === property.id
            ? "ring-2 ring-blue-500 scale-[1.02]"
            : "hover:scale-[1.01]"
        )}
      >
        <div className="relative">
          <img
            src={property.thumbnail}
            alt={property.address}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={e => handleShare(property, e)}
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
            <div className="p-2 bg-gray-50 rounded-lg">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="ml-auto flex w-fit">
                      <Info className="w-4 h-4" />
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-gray-900 text-white px-3 py-2 rounded text-sm max-w-xs"
                      sideOffset={5}
                    >
                      The Opportunity Score reflects the property's potential for growth, ROI, and market conditions.
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Opportunity Score</span>
                </div>
                <span
                  className={clsx(
                    "text-lg font-bold",
                    getScoreColor(property.opportunityScore.overall)
                  )}
                >
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

            <div className="p-2 bg-gray-50 rounded-lg">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span className="ml-auto flex w-fit">
                      <Info className="w-4 h-4" />
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className="bg-gray-900 text-white px-3 py-2 rounded text-sm max-w-xs"
                      sideOffset={5}
                    >
                      The Community Score reflects diversity, engagement, and available services in the property's neighborhood.
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Users2 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Community Score</span>
                </div>
                <span
                  className={clsx(
                    "text-lg font-bold",
                    getScoreColor(property.communityScore.overall)
                  )}
                >
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 whitespace-nowrap">
            <div className="flex items-center gap-1 text-gray-600">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">
                ${property.renovationCost.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {property.familyPercentage}% families
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
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
              <p className="text-sm text-gray-600">
                {property.buildingOverview.description}
              </p>
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
              onClick={e => handleAnalyzeProperty(e, property)}
            >
              {isAuthenticated ? (
                "Analyze Property"
              ) : (
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
                    onClick={e => handleViewReport(e, property.id)}
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
    </div>
  );
}
