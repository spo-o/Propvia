import { Property, BusinessType } from '../types';

export const properties: Property[] = [
  {
    id: '6',
    address: '4120 2nd Ave, Detroit, MI 48201',
    sqft: 9250,
    familyPercentage: 35,
    renovationCost: 280000,
    latitude: 42.351427,
    longitude: -83.067234,
    zoning: 'Commercial',
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    yearBuilt: 1955,
    lotSize: 12000,
    parkingSpaces: 20,
    walkScore: 82,
    transitScore: 75,
    bikeScore: 68,
    crimeRate: 'Moderate',
    nearbySchools: 3,
    medianIncome: 48000,
    populationGrowth: '+2.9% annually',
    propertyTax: 4200,
    floodRisk: 'Low',
    opportunityScore: {
      overall: 84,
      growth: 86,
      roi: 82,
      market: 84
    },
    communityScore: {
      overall: 80,
      diversity: 85,
      engagement: 78,
      services: 77
    },
    buildingOverview: {
      description: "Prime retail location in Detroit's vibrant Second Avenue district. Excellent visibility and foot traffic.",
      highlights: [
        "Corner location",
        "High ceiling height",
        "Recent electrical updates",
        "Multiple entry points"
      ],
      renovationHistory: [
        {
          date: "2020",
          description: "Electrical system upgrade"
        },
        {
          date: "2019",
          description: "Roof replacement"
        }
      ],
      amenities: [
        "Large display windows",
        "Rear loading dock",
        "Security system",
        "Storage space"
      ]
    },
    analysis: {
      daycare: {
        confidence: 68,
        startupCost: 250000,
        monthlyProfit: 9000,
        rationale: ['Growing residential area', 'Limited childcare options', 'Safe location'],
        breakeven: 26,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '35%'
        },
        demographicFit: {
          score: 72,
          keyFactors: ['Young families', 'Working parents']
        },
        riskAnalysis: {
          level: 'Medium',
          factors: ['High startup costs', 'Moderate competition']
        },
        projectedGrowth: {
          year1: 20,
          year3: 40,
          year5: 55
        }
      },
      cafe: {
        confidence: 88,
        startupCost: 180000,
        monthlyProfit: 15000,
        rationale: ['High foot traffic', 'University proximity', 'Arts district'],
        breakeven: 16,
        competitorAnalysis: {
          direct: 2,
          indirect: 3,
          marketShare: '30%'
        },
        demographicFit: {
          score: 90,
          keyFactors: ['Students', 'Young professionals']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['Strong location', 'Growing market']
        },
        projectedGrowth: {
          year1: 35,
          year3: 55,
          year5: 75
        }
      },
      coworking: {
        confidence: 92,
        startupCost: 300000,
        monthlyProfit: 25000,
        rationale: ['Creative district', 'Limited workspace options', 'Strong demand'],
        breakeven: 14,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '40%'
        },
        demographicFit: {
          score: 95,
          keyFactors: ['Freelancers', 'Creative professionals']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['High demand', 'Prime location']
        },
        projectedGrowth: {
          year1: 40,
          year3: 60,
          year5: 80
        }
      }
    },
    detailedMetrics: {
      buildingCondition: '',
      roofCondition: '',
      hvacAge: 0,
      electricalSystem: '',
      plumbingCondition: '',
      foundationStatus: '',
      accessibilityScore: 0,
      energyEfficiency: '',
      internetSpeed: '',
      noiseLevel: '',
      naturalLight: '',
      ceilingHeight: 0,
      loadingDock: false,
      sprinklerSystem: false,
      securitySystem: false,
      lastRenovated: 0
    }
  },
  {
    id: '7',
    address: '2211 E Jefferson, Detroit, MI 48207',
    sqft: 80289,
    familyPercentage: 28,
    renovationCost: 950000,
    latitude: 42.335789,
    longitude: -83.026234,
    zoning: 'Commercial',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    yearBuilt: 1962,
    lotSize: 95000,
    parkingSpaces: 200,
    walkScore: 88,
    transitScore: 82,
    bikeScore: 75,
    crimeRate: 'Low',
    nearbySchools: 4,
    medianIncome: 58000,
    populationGrowth: '+3.8% annually',
    propertyTax: 22000,
    floodRisk: 'Low',
    opportunityScore: {
      overall: 90,
      growth: 92,
      roi: 88,
      market: 90
    },
    communityScore: {
      overall: 85,
      diversity: 88,
      engagement: 84,
      services: 83
    },
    buildingOverview: {
      description: "Prominent office building on East Jefferson with excellent visibility and access. Ideal for mixed-use development.",
      highlights: [
        "Landmark building",
        "River views",
        "Modern infrastructure",
        "Flexible floor plates"
      ],
      renovationHistory: [
        {
          date: "2021",
          description: "HVAC modernization"
        },
        {
          date: "2019",
          description: "Lobby renovation"
        }
      ],
      amenities: [
        "24/7 Security",
        "Conference Center",
        "Fitness Center",
        "Covered Parking"
      ]
    },
    analysis: {
      daycare: {
        confidence: 75,
        startupCost: 500000,
        monthlyProfit: 35000,
        rationale: ['Business district', 'Corporate partnerships', 'Modern facilities'],
        breakeven: 18,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '40%'
        },
        demographicFit: {
          score: 80,
          keyFactors: ['Corporate employees', 'Urban families']
        },
        riskAnalysis: {
          level: 'Medium',
          factors: ['High startup costs', 'Market competition']
        },
        projectedGrowth: {
          year1: 25,
          year3: 45,
          year5: 65
        }
      },
      cafe: {
        confidence: 85,
        startupCost: 280000,
        monthlyProfit: 22000,
        rationale: ['High office density', 'Limited dining options', 'River views'],
        breakeven: 15,
        competitorAnalysis: {
          direct: 2,
          indirect: 4,
          marketShare: '35%'
        },
        demographicFit: {
          score: 88,
          keyFactors: ['Office workers', 'Tourists']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['Strong location', 'Steady traffic']
        },
        projectedGrowth: {
          year1: 30,
          year3: 50,
          year5: 70
        }
      },
      coworking: {
        confidence: 95,
        startupCost: 800000,
        monthlyProfit: 65000,
        rationale: ['Prime location', 'Modern amenities', 'Strong demand'],
        breakeven: 14,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '45%'
        },
        demographicFit: {
          score: 95,
          keyFactors: ['Entrepreneurs', 'Remote workers']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['High demand', 'Premium location']
        },
        projectedGrowth: {
          year1: 40,
          year3: 60,
          year5: 80
        }
      }
    },
    detailedMetrics: {
      buildingCondition: '',
      roofCondition: '',
      hvacAge: 0,
      electricalSystem: '',
      plumbingCondition: '',
      foundationStatus: '',
      accessibilityScore: 0,
      energyEfficiency: '',
      internetSpeed: '',
      noiseLevel: '',
      naturalLight: '',
      ceilingHeight: 0,
      loadingDock: false,
      sprinklerSystem: false,
      securitySystem: false,
      lastRenovated: 0
    }
  },
  {
    id: '8',
    address: '1360 E Jefferson Ave, Detroit, MI 48207',
    sqft: 7524,
    familyPercentage: 32,
    renovationCost: 320000,
    latitude: 42.336789,
    longitude: -83.032234,
    zoning: 'Mixed-Use',
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    yearBuilt: 1945,
    lotSize: 8500,
    parkingSpaces: 15,
    walkScore: 86,
    transitScore: 78,
    bikeScore: 72,
    crimeRate: 'Low',
    nearbySchools: 3,
    medianIncome: 52000,
    populationGrowth: '+3.5% annually',
    propertyTax: 5800,
    floodRisk: 'Low',
    opportunityScore: {
      overall: 88,
      growth: 90,
      roi: 86,
      market: 88
    },
    communityScore: {
      overall: 84,
      diversity: 86,
      engagement: 82,
      services: 84
    },
    buildingOverview: {
      description: "Historic mixed-use building in prime East Jefferson location. Perfect for retail/residential combination.",
      highlights: [
        "Historic facade",
        "Corner location",
        "High ceilings",
        "Large windows"
      ],
      renovationHistory: [
        {
          date: "2018",
          description: "Facade restoration"
        },
        {
          date: "2017",
          description: "Systems upgrade"
        }
      ],
      amenities: [
        "Original details",
        "Basement storage",
        "Rear access",
        "Street parking"
      ]
    },
    analysis: {
      daycare: {
        confidence: 70,
        startupCost: 280000,
        monthlyProfit: 18000,
        rationale: ['Growing area', 'Mixed-use zoning', 'Safe location'],
        breakeven: 20,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '35%'
        },
        demographicFit: {
          score: 75,
          keyFactors: ['Young families', 'Urban professionals']
        },
        riskAnalysis: {
          level: 'Medium',
          factors: ['Space constraints', 'Competition']
        },
        projectedGrowth: {
          year1: 25,
          year3: 45,
          year5: 60
        }
      },
      cafe: {
        confidence: 92,
        startupCost: 220000,
        monthlyProfit: 20000,
        rationale: ['High foot traffic', 'Tourist area', 'Limited options'],
        breakeven: 14,
        competitorAnalysis: {
          direct: 1,
          indirect: 3,
          marketShare: '40%'
        },
        demographicFit: {
          score: 95,
          keyFactors: ['Young professionals', 'Tourists']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['Prime location', 'Growing area']
        },
        projectedGrowth: {
          year1: 35,
          year3: 55,
          year5: 75
        }
      },
      coworking: {
        confidence: 85,
        startupCost: 350000,
        monthlyProfit: 28000,
        rationale: ['Mixed-use area', 'Growing demand', 'Good transit'],
        breakeven: 16,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '35%'
        },
        demographicFit: {
          score: 88,
          keyFactors: ['Freelancers', 'Small businesses']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['Strong demand', 'Good location']
        },
        projectedGrowth: {
          year1: 30,
          year3: 50,
          year5: 70
        }
      }
    },
    detailedMetrics: {
      buildingCondition: '',
      roofCondition: '',
      hvacAge: 0,
      electricalSystem: '',
      plumbingCondition: '',
      foundationStatus: '',
      accessibilityScore: 0,
      energyEfficiency: '',
      internetSpeed: '',
      noiseLevel: '',
      naturalLight: '',
      ceilingHeight: 0,
      loadingDock: false,
      sprinklerSystem: false,
      securitySystem: false,
      lastRenovated: 0
    }
  },
  {
    id: '9',
    address: '1341 Springwells St, Detroit, MI 48209',
    sqft: 4200,
    familyPercentage: 45,
    renovationCost: 180000,
    latitude: 42.309789,
    longitude: -83.112234,
    zoning: 'Commercial',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    yearBuilt: 1952,
    lotSize: 5500,
    parkingSpaces: 12,
    walkScore: 75,
    transitScore: 65,
    bikeScore: 70,
    crimeRate: 'Low',
    nearbySchools: 4,
    medianIncome: 42000,
    populationGrowth: '+2.5% annually',
    propertyTax: 3200,
    floodRisk: 'Low',
    opportunityScore: {
      overall: 82,
      growth: 80,
      roi: 85,
      market: 81
    },
    communityScore: {
      overall: 78,
      diversity: 82,
      engagement: 75,
      services: 77
    },
    buildingOverview: {
      description: "Former Vince's Italian Restaurant with established neighborhood presence. Turnkey restaurant opportunity.",
      highlights: [
        "Full kitchen",
        "Bar setup",
        "Dining room",
        "Outdoor space"
      ],
      renovationHistory: [
        {
          date: "2016",
          description: "Kitchen upgrade"
        },
        {
          date: "2015",
          description: "Interior renovation"
        }
      ],
      amenities: [
        "Commercial kitchen",
        "Bar area",
        "Storage room",
        "Parking lot"
      ]
    },
    analysis: {
      daycare: {
        confidence: 65,
        startupCost: 200000,
        monthlyProfit: 12000,
        rationale: ['Family neighborhood', 'Affordable area', 'Safe location'],
        breakeven: 22,
        competitorAnalysis: {
          direct: 2,
          indirect: 1,
          marketShare: '30%'
        },
        demographicFit: {
          score: 70,
          keyFactors: ['Local families', 'Working parents']
        },
        riskAnalysis: {
          level: 'Medium',
          factors: ['Space conversion', 'Competition']
        },
        projectedGrowth: {
          year1: 20,
          year3: 40,
          year5: 55
        }
      },
      cafe: {
        confidence: 78,
        startupCost: 150000,
        monthlyProfit: 14000,
        rationale: ['Local demand', 'Limited options', 'Good parking'],
        breakeven: 18,
        competitorAnalysis: {
          direct: 1,
          indirect: 2,
          marketShare: '35%'
        },
        demographicFit: {
          score: 80,
          keyFactors: ['Local residents', 'Morning commuters']
        },
        riskAnalysis: {
          level: 'Low',
          factors: ['Existing setup', 'Known location']
        },
        projectedGrowth: {
          year1: 25,
          year3: 45,
          year5: 65
        }
      },
      coworking: {
        confidence: 70,
        startupCost: 220000,
        monthlyProfit: 16000,
        rationale: ['Growing area', 'Affordable rates', 'Good parking'],
        breakeven: 20,
        competitorAnalysis: {
          direct: 0,
          indirect: 1,
          marketShare: '45%'
        },
        demographicFit: {
          score: 75,
          keyFactors: ['Local entrepreneurs', 'Remote workers']
        },
        riskAnalysis: {
          level: 'Medium',
          factors: ['Market uncertainty', 'Location challenges']
        },
        projectedGrowth: {
          year1: 20,
          year3: 40,
          year5: 60
        }
      }
    },
    detailedMetrics: {
      buildingCondition: '',
      roofCondition: '',
      hvacAge: 0,
      electricalSystem: '',
      plumbingCondition: '',
      foundationStatus: '',
      accessibilityScore: 0,
      energyEfficiency: '',
      internetSpeed: '',
      noiseLevel: '',
      naturalLight: '',
      ceilingHeight: 0,
      loadingDock: false,
      sprinklerSystem: false,
      securitySystem: false,
      lastRenovated: 0
    }
  }
];

export const businessTypes: BusinessType[] = [
  {
    id: 'daycare',
    name: 'Daycare',
    description: 'Child care facility for working parents'
  },
  {
    id: 'cafe',
    name: 'Café',
    description: 'Coffee shop and light dining'
  },
  {
    id: 'coworking',
    name: 'Coworking Space',
    description: 'Flexible workspace for professionals'
  }
];