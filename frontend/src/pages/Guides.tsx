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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand to-brand-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Guides & <span className="text-accent">Resources</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Everything you need to master commercial property analysis and investment. 
            From beginner basics to advanced strategies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Guide Cards Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Learning Guides
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deep-dive into our expertly crafted guides designed to accelerate your property investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <div 
                  key={guide.id} 
                  className="group relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-100"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand/5 to-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
                  
                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-brand to-brand-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-8 leading-relaxed text-center">{guide.description}</p>

                    {/* CTA Button */}
                    <Link 
                      to={`/guides/${guide.id}`}
                      className="group/btn w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-brand to-brand-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-brand-600 hover:to-brand-700 hover:shadow-lg"
                    >
                      <span className="mr-2">Start Learning</span>
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resources Section */}
        <DownloadableResources />

        {/* CTA Section */}
        <div className="mt-20 relative overflow-hidden bg-gradient-to-r from-brand to-brand-600 rounded-3xl p-12 text-center text-white">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full"></div>
            <div className="absolute top-12 right-8 w-4 h-4 bg-accent rounded-full"></div>
            <div className="absolute bottom-8 left-12 w-6 h-6 bg-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-accent rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Personalized Guidance?</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Our team of commercial real estate experts is ready to provide you with tailored advice and strategic insights for your specific investment goals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-accent text-brand rounded-xl hover:bg-accent-dark transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Expert Consultation
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { guides };