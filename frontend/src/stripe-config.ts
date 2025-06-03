export const STRIPE_PRODUCTS = {
  COMMUNITY_CATALYST: {
    id: 'prod_SKtBMMmLoSun5d',
    priceId: 'price_1RQDPbF9qDa8tSWEKbam7cY8',
    name: 'Community Catalyst',
    description: 'Jumpstart your Detroit investment with AI-powered insights. Get an Opportunity Score (0-100), 5-year financial forecasts, and a community impact report showing jobs created and equity alignment. Includes a 1-hour strategy call and 30-day email support. Perfect for first-time investors exploring single properties.',
    price: 750,
    features: [
      'AI Opportunity Score (0-100)',
      '5-Year Financial Forecasts',
      'Community Impact Report',
      'Jobs Created Analysis',
      '1-Hour Strategy Call',
      '30-Day Email Support'
    ],
    mode: 'payment'
  },
  URBAN_INNOVATOR: {
    id: 'prod_SLELCEN3Rly9Y6',
    priceId: 'price_1RQXssF9qDa8tSWEyf5DdAjP',
    name: 'Urban Innovator',
    description: 'Scale your impact with advanced tools. Includes everything in Community Catalyst PLUS custom build-out scenarios (café vs. daycare vs. maker space), pro forma financial models, a Detroit permit/zoning checklist, and 3 tailored funding sources. Add a 60-minute strategy session and 60-day Slack support. Ideal for growing businesses or multi-property investors.',
    price: 1200,
    features: [
      'Everything in Community Catalyst +',
      'Custom Build-Out Scenarios',
      'Pro Forma Financial Models',
      'Detroit Permit/Zoning Checklist',
      '3 Tailored Funding Sources',
      '60-Minute Strategy Session',
      '60-Day Slack Support'
    ],
    mode: 'payment'
  },
  NEIGHBORHOOD_VISIONARY: {
    id: 'prod_SLEQWIXFZkNrBj',
    priceId: 'price_1RQXxdF9qDa8tSWEQVr5D4hn',
    name: 'Neighborhood Visionary',
    description: 'Lead large-scale revitalization. Includes everything in Urban Innovator PLUS priority site visits (Detroit only), 5 funding sources (grants + VC/angel investors), a risk mitigation playbook, and 90-day VIP support. Designed for developers and city partners transforming entire blocks. Add travel ($300) for non-local sites.',
    price: 1500,
    features: [
      'Everything in Urban Innovator +',
      'Priority Site Visits (Detroit)',
      '5 Funding Sources',
      'Risk Mitigation Playbook',
      '90-Day VIP Support',
      'Priority Analysis (3 Days)'
    ],
    mode: 'payment'
  }
} as const;