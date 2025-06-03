import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ArrowRight, Brain, Target, ChevronRight } from 'lucide-react';
import DownloadableResources from '../components/DownloadableResources';

const guides = [
  {
    id: 'platform',
    title: 'Platform Guide',
    description: 'Learn how to use our platform to analyze commercial properties and make data-driven investment decisions.',
    icon: Book,
    sections: [
      {
        title: 'Getting Started',
        content: `
# Getting Started with Propvia

Welcome to Propvia's comprehensive platform guide. This guide will help you navigate our AI-powered property analysis tools and make the most of our features.

## Key Features Overview

1. **Property Search & Analysis**
   - Interactive map interface
   - Advanced filtering options
   - AI-powered opportunity scoring

2. **Market Intelligence**
   - Real-time market data
   - Demographic insights
   - Economic indicators

3. **Financial Tools**
   - ROI calculator
   - Cash flow projections
   - Investment scenario modeling

## Using the Platform

### Property Search
- Use the map view for spatial analysis
- Apply filters for specific criteria
- Save properties for later analysis

### Analysis Tools
- Run AI analysis on properties
- Compare multiple scenarios
- Generate detailed reports

### Collaboration Features
- Share analyses with team members
- Add notes and comments
- Export reports in multiple formats

## Best Practices

1. **Data Input**
   - Provide accurate property details
   - Update information regularly
   - Verify source data

2. **Analysis Review**
   - Check all assumptions
   - Compare multiple scenarios
   - Consider market context

3. **Decision Making**
   - Review all risk factors
   - Consider community impact
   - Validate financial projections
        `
      }
    ]
  },
  {
    id: 'analysis',
    title: 'Analysis Guide',
    description: 'Deep dive into the key metrics we use to evaluate commercial properties and their potential.',
    icon: Brain,
    sections: [
      {
        title: 'Understanding Our Metrics',
        content: `
# Understanding Property Analysis Metrics

## Core Metrics Explained

### 1. Opportunity Score
- Market potential assessment
- Growth trajectory analysis
- Competitive positioning

### 2. Financial Metrics
- ROI calculations
- Cash flow projections
- Operating cost estimates

### 3. Risk Assessment
- Market risk factors
- Property condition analysis
- Regulatory compliance

## Advanced Analysis Features

### 1. AI Predictions
- Market trend forecasting
- Demand modeling
- Price sensitivity analysis

### 2. Community Impact
- Job creation potential
- Local economic benefits
- Environmental considerations

### 3. Competitive Analysis
- Market saturation study
- Competitor mapping
- Differentiation opportunities

## Using Analysis Results

1. **Decision Framework**
   - Evaluating opportunities
   - Comparing alternatives
   - Risk mitigation strategies

2. **Implementation Planning**
   - Timeline development
   - Resource allocation
   - Milestone tracking

3. **Performance Monitoring**
   - KPI tracking
   - Adjustment strategies
   - Success metrics
        `
      }
    ]
  },
  {
    id: 'investment',
    title: 'Investment Guide',
    description: 'Comprehensive overview of different commercial property types and their characteristics.',
    icon: Target,
    sections: [
      {
        title: 'Investment Strategies',
        content: `
# Commercial Property Investment Strategies

## Market Analysis

### 1. Location Assessment
- Demographic trends
- Economic indicators
- Infrastructure development

### 2. Property Types
- Retail opportunities
- Office spaces
- Mixed-use developments

### 3. Growth Indicators
- Population trends
- Business formation
- Income levels

## Investment Approaches

### 1. Value-Add Strategy
- Property improvements
- Tenant mix optimization
- Operating efficiency

### 2. Development Strategy
- Land acquisition
- Construction planning
- Project management

### 3. Hold Strategy
- Long-term appreciation
- Cash flow optimization
- Market timing

## Risk Management

1. **Market Risks**
   - Demand fluctuations
   - Competition
   - Economic cycles

2. **Property Risks**
   - Physical condition
   - Environmental issues
   - Regulatory compliance

3. **Financial Risks**
   - Interest rates
   - Operating costs
   - Vacancy rates
        `
      }
    ]
  }
];

export default function Guides() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Guides & Resources</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about commercial property analysis and investment. 
          Browse our comprehensive guides and download helpful resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <div 
              key={guide.id} 
              className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-brand/10 rounded-lg">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-900">{guide.title}</h2>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{guide.description}</p>

              <Link 
                to={`/guides/${guide.id}`}
                className="inline-flex items-center text-brand hover:text-brand-600 font-medium"
              >
                <span className="mr-2">Read Guide</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>

      <DownloadableResources />

      <div className="mt-16 bg-brand rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Need Custom Guidance?</h2>
        <p className="text-gray-100 mb-6">
          Our team of experts is here to help you with personalized advice and support.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 bg-accent text-brand rounded-lg hover:bg-accent-dark transition-colors"
        >
          Contact Our Team
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}

export { guides };