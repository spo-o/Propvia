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
        "relative transition-all duration-200",
        selectedProperty?.id === property.id
          ? "ring-2 ring-blue-500 shadow-blue-100"
          : "hover:border-gray-200"
      )}
    >
      <div className="p-4">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={property.thumbnail}
            alt={property.address}
            className="w-20 h-20 object-cover rounded-xl flex-shrink-0 shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-base truncate">
                {property.address}
              </h3>
              <button
                onClick={e => handleShare(property, e)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
              >
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {" sqft: " + property.sqft?.toLocaleString() || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {`${property.renovationCost?.toLocaleString() || "N/A"}`}
              </span>
            </div>
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md">
              {property.zoning}
            </span>
          </div>
        </div>

        {/* Scores Section */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
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
                    The Opportunity Score reflects the property's potential for
                    growth, ROI, and market conditions.
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <div className="flex items-center justify-between mb-2 gap-1">
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium text-gray-700">
                  Opportunity
                </span>
              </div>
              {/* <span
                className={clsx(
                  "text-lg font-bold",
                  getScoreColor(property.opportunityScore.overall)
                )}
              >
                {property.opportunityScore.overall}%
              </span> */}
            </div>
            <div className="flex justify-center gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-500">Growth</div>
                {/* <div className="font-medium">
                  {property.opportunityScore.growth}%
                </div> */}
              </div>
              <div className="text-center">
                <div className="text-gray-500">ROI</div>
                {/* <div className="font-medium">
                  {property.opportunityScore.roi}%
                </div> */}
              </div>
              <div className="text-center">
                <div className="text-gray-500">Market</div>
                {/* <div className="font-medium">
                  {property.opportunityScore.market}%
                </div> */}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
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
                    The Community Score reflects diversity, engagement, and
                    available services in the property's neighborhood.
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
            <div className="flex items-center justify-between mb-2 gap-1">
              <div className="flex items-center gap-1">
                <Users2 className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-medium text-gray-700">
                  Community
                </span>
              </div>
              {/* <span
                className={clsx(
                  "text-lg font-bold",
                  getScoreColor(property.communityScore.overall)
                )}
              >
                {property.communityScore.overall}%
              </span> */}
            </div>
            <div className="flex justify-center gap-2 text-xs">
              <div className="text-center">
                <div className="text-gray-500">Diversity</div>
                {/* <div className="font-medium">
                  {property.communityScore.diversity}%
                </div> */}
              </div>
              <div className="text-center">
                <div className="text-gray-500">Engage</div>
                {/* <div className="font-medium">
                  {property.communityScore.engagement}%
                </div> */}
              </div>
              <div className="text-center">
                <div className="text-gray-500">Services</div>
                {/* <div className="font-medium">
                  {property.communityScore.services}%
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">
                {property.familyPercentage}% families
              </span>
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
          <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-2">
            {/* <p className="text-sm text-gray-600">
              {property.buildingOverview.description}
            </p> */}
            {/* <div className="space-y-1">
              {property.buildingOverview.highlights
                .slice(0, 3)
                .map((highlight, i) => (
                  <div key={i} className="flex items-center space-x-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
            </div> */}
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
