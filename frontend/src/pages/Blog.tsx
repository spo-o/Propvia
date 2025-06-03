import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User, ArrowRight, Tag, Search } from 'lucide-react';

export const blogPosts = [
  {
    id: 1,
    title: "Detroit's $2.1B Commercial Property Renaissance: Your 2024 Investment Guide",
    excerpt: "An in-depth analysis of Detroit's commercial property market transformation, featuring AI-driven insights and real success stories.",
    content: `
# Detroit's $2.1B Commercial Property Renaissance: Your 2024 Investment Guide

Detroit's commercial real estate landscape is undergoing a remarkable transformation, with over $2.1 billion in new investments flowing into key districts. This renaissance isn't just about buying properties – it's about understanding market dynamics, community needs, and future growth potential.

## The Current State of Detroit's Commercial Market

Latest market indicators show impressive resilience and growth:

- Property values up 12% year-over-year in key districts
- Occupancy rates exceeding 85% in prime areas
- New business registrations increased 25% from 2023
- Over 30,000 vacant properties ready for transformation

## Strategic Investment Areas

### 1. Midtown District
- 15,000+ daily foot traffic
- Strong university presence (Wayne State)
- $500M in planned developments
- 92% occupancy rate in retail spaces

### 2. Corktown
- Historic charm meets modern demand
- Ford's $740M mobility innovation campus
- Thriving food and beverage scene
- 28% increase in property values

### 3. Eastern Market
- 45,000+ weekly visitors
- Food-centric business cluster
- $100M in infrastructure improvements
- Strong community engagement

## Investment Strategies for 2024

1. **Mixed-Use Development Focus**
   - Combine retail and residential
   - Create community spaces
   - Target 15-20% higher ROI than single-use

2. **Technology Integration**
   - Smart building systems reduce costs by 25%
   - IoT sensors for foot traffic analysis
   - AI-powered market analysis tools

3. **Community-First Approach**
   - Partner with neighborhood organizations
   - Create local job opportunities
   - Build sustainable business ecosystems

## Success Story: The Jefferson Project

A vacant 5,000 sq ft building transformed into a thriving mixed-use space:
- Initial investment: $450,000
- Current monthly revenue: $28,000
- Community impact: 15 new jobs created
- Property value increased 180%

## Conclusion

Detroit's commercial real estate market presents unique opportunities for investors who combine data-driven analysis with community-focused development strategies. The key to success lies in understanding both the numbers and the neighborhood dynamics.
    `,
    date: "March 15, 2024",
    author: "Sarah Johnson",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
    tags: ["Detroit", "Commercial Real Estate", "Investment"]
  },
  {
    id: 2,
    title: "From Vacant to Vibrant: 5 Detroit Success Stories That Will Inspire You",
    excerpt: "Real stories of entrepreneurs who transformed vacant properties into thriving community assets, complete with ROI analysis and practical lessons.",
    content: `
# From Vacant to Vibrant: 5 Detroit Success Stories That Will Inspire You

## The Coffee Shop That Sparked a Neighborhood Revival

### The Numbers
- Property: 2,500 sq ft vacant storefront
- Initial Investment: $180,000
- Monthly Revenue: $45,000
- Break-even: 14 months
- Community Impact: Created 12 jobs, hosts local events

### The Strategy
- Focused on quality and community
- Partnered with local artists
- Created flexible event space
- Built strong social media presence

## The Daycare That Filled a Critical Need

### The Numbers
- Property: 3,200 sq ft former office
- Initial Investment: $250,000
- Monthly Revenue: $65,000
- Break-even: 16 months
- Community Impact: Serves 45 families, created 8 jobs

### The Strategy
- Extensive market research
- Focus on safety and education
- Partnership with local schools
- Parent involvement programs

## The Tech Hub That Transformed a Warehouse

### The Numbers
- Property: 15,000 sq ft warehouse
- Initial Investment: $1.2M
- Monthly Revenue: $95,000
- Break-even: 24 months
- Community Impact: Houses 25 startups, 100+ jobs

### The Strategy
- Phased renovation approach
- Focus on flexible spaces
- Strong internet infrastructure
- Mentorship programs

## Key Lessons Learned

1. **Community First**
   - Engage early and often
   - Address real needs
   - Build partnerships
   - Create local jobs

2. **Smart Financing**
   - Leverage grants
   - Phase investments
   - Build contingencies
   - Focus on sustainability

3. **Market Research**
   - Analyze demographics
   - Study competition
   - Understand trends
   - Use AI insights
    `,
    date: "March 20, 2024",
    author: "Michael Chen",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    tags: ["Success Stories", "Entrepreneurship", "Urban Development"]
  },
  {
    id: 3,
    title: "The Ultimate Guide to Detroit Commercial Property Analysis",
    excerpt: "Learn how to use AI and data analytics to evaluate commercial properties and make informed investment decisions in Detroit's evolving market.",
    content: `
# The Ultimate Guide to Detroit Commercial Property Analysis

## Understanding Detroit's Market Dynamics

### Key Metrics to Track
1. Property Values
   - Historical trends
   - Neighborhood comparisons
   - Growth projections

2. Demographics
   - Population changes
   - Income levels
   - Age distribution

3. Business Environment
   - New business registrations
   - Industry clusters
   - Employment trends

## Using AI for Property Analysis

### What AI Can Tell You
1. Market Potential
   - Foot traffic patterns
   - Consumer behavior
   - Competition analysis

2. Risk Assessment
   - Market volatility
   - Property condition
   - Environmental factors

3. Growth Opportunities
   - Development plans
   - Infrastructure projects
   - Economic indicators

## Financial Analysis Framework

### Key Calculations
1. ROI Projections
   - Revenue potential
   - Operating costs
   - Capital requirements

2. Risk Metrics
   - Market risks
   - Property risks
   - Financial risks

3. Impact Assessment
   - Community benefits
   - Job creation
   - Economic growth

## Case Study: Midtown Success Story

### Property Details
- 5,000 sq ft retail space
- $400,000 purchase price
- $250,000 renovation
- 18-month timeline

### Results
- 95% occupancy
- $25,000 monthly revenue
- 15 new jobs created
- 40% property value increase

## Action Steps

1. **Research Phase**
   - Gather market data
   - Analyze trends
   - Study competition

2. **Analysis Phase**
   - Use AI tools
   - Calculate metrics
   - Assess risks

3. **Decision Phase**
   - Review findings
   - Consider alternatives
   - Make informed choice
    `,
    date: "March 25, 2024",
    author: "David Miller",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    tags: ["Property Analysis", "AI", "Investment Strategy"]
  }
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert analysis and insights about Detroit's commercial property market, urban development, and investment opportunities.
        </p>
      </div>

      <div className="mb-8">
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article 
            key={post.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
          >
            <Link to={`/blog/${post.id}`}>
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
              />
            </Link>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand/10 text-brand"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
              
              <Link to={`/blog/${post.id}`}>
                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-brand transition-colors">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-500">{post.author}</span>
                </div>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="flex items-center text-brand hover:text-brand-600 font-medium"
                >
                  <span className="mr-2">Read more</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 bg-brand text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6">Get the latest insights and analysis delivered to your inbox.</p>
        <form className="max-w-md mx-auto">
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-brand font-medium rounded-lg hover:bg-accent-dark transition-colors"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}