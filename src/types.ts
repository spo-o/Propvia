export interface Property {
  id: string;
  address: string;
  sqft: number;
  familyPercentage: number;
  renovationCost: number;
  latitude: number;
  longitude: number;
  zoning: 'Commercial' | 'Mixed-Use';
  thumbnail: string;
  yearBuilt: number;
  lotSize: number;
  parkingSpaces: number;
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  nearbySchools: number;
  crimeRate: string;
  medianIncome: number;
  populationGrowth: string;
  propertyTax: number;
  floodRisk: 'Low' | 'Medium' | 'High';
  opportunityScore: {
    overall: number;
    growth: number;
    roi: number;
    market: number;
  };
  communityScore: {
    overall: number;
    diversity: number;
    engagement: number;
    services: number;
  };
  buildingOverview: {
    description: string;
    highlights: string[];
    renovationHistory: {
      date: string;
      description: string;
    }[];
    amenities: string[];
  };
  analysis: {
    daycare: BusinessAnalysis;
    cafe: BusinessAnalysis;
    coworking: BusinessAnalysis;
  };
  detailedMetrics: {
    buildingCondition: string;
    roofCondition: string;
    hvacAge: number;
    electricalSystem: string;
    plumbingCondition: string;
    foundationStatus: string;
    accessibilityScore: number;
    energyEfficiency: string;
    internetSpeed: string;
    noiseLevel: string;
    naturalLight: string;
    ceilingHeight: number;
    loadingDock: boolean;
    sprinklerSystem: boolean;
    securitySystem: boolean;
    lastRenovated: number;
  };
}

export interface BusinessType {
  id: string;
  name: string;
  description: string;
}

interface BusinessAnalysis {
  confidence: number;
  startupCost: number;
  monthlyProfit: number;
  rationale: string[];
  breakeven: number;
  competitorAnalysis: {
    direct: number;
    indirect: number;
    marketShare: string;
  };
  demographicFit: {
    score: number;
    keyFactors: string[];
  };
  riskAnalysis: {
    level: string;
    factors: string[];
  };
  projectedGrowth: {
    year1: number;
    year3: number;
    year5: number;
  };
}

interface Analysis {
  id: string;
  propertyId: string;
  businessType: string;
  marketingBudget: number;
  monthlyRent: number;
  profitTimeline: { month: number; profit: number }[];
  confidence: number;
}

export interface SavedScenario {
  id: string;
  name: string;
  property: Property;
  analysis: Analysis;
  dateCreated: Date;
  lastModified: Date;
  notes: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  savedScenarios: SavedScenario[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: Date;
}

interface GeneratedReport {
  id: string;
  scenarioId: string;
  dateGenerated: Date;
  type: 'full' | 'summary' | 'financial' | 'market';
  status: 'completed' | 'pending' | 'failed';
  downloadUrl?: string;
}