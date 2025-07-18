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
  },
  {
    id: 4,
    title: "Detroit's Green Revolution: Sustainable Development Meets Profitable Investment",
    excerpt: "Discover how eco-friendly building practices are driving both environmental impact and financial returns in Detroit's commercial real estate market.",
    content: `
# Detroit's Green Revolution: Sustainable Development Meets Profitable Investment

## The Rise of Sustainable Commercial Development

Detroit is experiencing a green revolution in commercial real estate, where sustainability isn't just about environmental responsibility—it's becoming a key driver of profitability and long-term value creation.

## Market Demand for Green Buildings

### Current Trends
- 67% of Detroit businesses prioritize sustainable office spaces
- Green-certified buildings command 15-25% higher rents
- Energy-efficient properties show 30% lower vacancy rates
- Government incentives up to $50,000 for green renovations

### Tenant Preferences
- Millennials and Gen Z workers prefer eco-friendly workspaces
- Corporate sustainability goals drive location decisions
- Health and wellness features increase employee satisfaction
- Lower utility costs attract cost-conscious businesses

## Sustainable Features That Drive ROI

### Energy Efficiency
1. **LED Lighting Systems**
   - 75% reduction in lighting costs
   - $8-12 per sq ft annual savings
   - Improved tenant satisfaction

2. **Smart HVAC Systems**
   - 40% reduction in energy consumption
   - Predictive maintenance reduces costs
   - Better air quality increases productivity

3. **Solar Panel Installation**
   - 25-year ROI of 200-300%
   - Federal tax credits up to 30%
   - Energy independence reduces operating costs

### Water Conservation
- Low-flow fixtures reduce water bills by 30%
- Rainwater harvesting systems
- Drought-resistant landscaping
- Smart irrigation controls

### Sustainable Materials
- Recycled and locally-sourced materials
- Low-VOC paints and finishes
- Sustainable flooring options
- Energy-efficient windows and insulation

## Case Study: The Green Gateway Project

### Project Overview
- 25,000 sq ft former manufacturing facility
- $1.8M total investment ($1.2M purchase + $600K green renovation)
- LEED Gold certification achieved
- Mixed-use: offices, retail, community space

### Green Features Implemented
- Solar panel array (50kW capacity)
- Geothermal heating and cooling
- Rainwater collection system
- Green roof with urban garden
- EV charging stations

### Financial Results
- **Energy Savings**: $45,000 annually
- **Rental Premium**: 20% above market rate
- **Occupancy Rate**: 98% (vs 82% market average)
- **Property Value Increase**: 45% in 18 months
- **Total ROI**: 35% annual return

### Community Impact
- 15 new businesses housed
- 85 jobs created
- 40% reduction in building's carbon footprint
- Community garden serves 200+ families

## Available Incentives and Programs

### Federal Programs
- Investment Tax Credit (ITC): 30% for solar installations
- Modified Accelerated Cost Recovery System (MACRS)
- Opportunity Zone benefits for qualifying areas

### State of Michigan Incentives
- Commercial Property Assessed Clean Energy (C-PACE) financing
- Michigan Energy Optimization grants
- Brownfield redevelopment tax credits

### Local Detroit Programs
- Detroit Building Authority green building incentives
- Property tax abatements for sustainable features
- Fast-track permitting for green projects
- Utility rebates for energy-efficient upgrades

## Green Building Certification Options

### LEED Certification
- Most recognized standard
- Four levels: Certified, Silver, Gold, Platinum
- Comprehensive scoring system
- Strong market recognition

### ENERGY STAR Certification
- Focus on energy performance
- Annual certification renewal
- Benchmarking against similar buildings
- Lower barrier to entry

### Green Globes
- Flexible, affordable alternative
- Self-assessment with third-party verification
- Continuous improvement focus
- Good for smaller projects

## Investment Strategies for Green Development

### 1. Retrofit Existing Buildings
- Lower initial investment
- Immediate energy savings
- Preserve historic character
- Faster project timeline

### 2. Ground-Up Green Construction
- Maximum design flexibility
- Latest technology integration
- Higher certification potential
- Premium positioning in market

### 3. Mixed-Use Green Communities
- Diverse revenue streams
- Shared sustainability infrastructure
- Enhanced community appeal
- Higher overall returns

## Future Trends in Sustainable Development

### Emerging Technologies
- Smart building automation
- Advanced energy storage systems
- Carbon capture technologies
- Biophilic design elements

### Market Evolution
- Net-zero energy requirements
- Climate resilience planning
- Circular economy principles
- Health and wellness focus

## Getting Started with Green Investment

### Step 1: Market Analysis
- Identify target areas with green building demand
- Research available incentives and programs
- Analyze comparable green properties
- Assess utility and infrastructure capacity

### Step 2: Property Assessment
- Energy audit of existing buildings
- Structural evaluation for green retrofits
- Site analysis for renewable energy potential
- Cost-benefit analysis of green features

### Step 3: Financial Planning
- Calculate total project costs
- Model energy savings and revenue premiums
- Secure green financing options
- Plan for certification expenses

### Step 4: Implementation
- Hire experienced green building professionals
- Select sustainable materials and systems
- Monitor construction for certification compliance
- Plan marketing strategy around green features

## Conclusion

Detroit's green building revolution represents a convergence of environmental responsibility and financial opportunity. As demand for sustainable spaces continues to grow, early investors in green commercial properties are positioning themselves for both strong returns and positive community impact.

The combination of available incentives, growing tenant demand, and proven financial benefits makes sustainable development one of the most compelling investment strategies in Detroit's evolving commercial real estate market.
    `,
    date: "April 2, 2024",
    author: "Elena Rodriguez",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tags: ["Sustainable Development", "Green Building", "ROI", "Detroit"]
  }
  
];

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Get all unique tags
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-700 via-brand to-brand-900 py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm backdrop-blur-sm border border-accent/30">
                📚 Expert Insights & Analysis
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Latest <span className="text-accent">Insights</span>
            </h1>
            <p className="text-xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Expert analysis and insights about Detroit's commercial property market, urban development, and investment opportunities.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-accent text-gray-900 placeholder-gray-500"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    !selectedTag 
                      ? 'bg-accent text-brand-900 shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  All Topics
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTag === tag 
                        ? 'bg-accent text-brand-900 shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-8 relative z-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('');
              }}
              className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featuredPost && (
              <div className="mb-16">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <Link to={`/blog/${featuredPost.id}`}>
                        <img 
                          src={featuredPost.image} 
                          alt={featuredPost.title}
                          className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-semibold rounded-full text-sm">
                          Featured Article
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand/10 text-brand"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link to={`/blog/${featuredPost.id}`}>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-brand transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                      </Link>
                      
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <span>{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{featuredPost.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/blog/${featuredPost.id}`}
                          className="inline-flex items-center px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-600 transition-colors group"
                        >
                          <span className="mr-2">Read Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Articles Grid */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <Link to={`/blog/${post.id}`}>
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-brand/10 text-brand font-medium"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link to={`/blog/${post.id}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-brand transition-colors line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/blog/${post.id}`}
                          className="flex items-center text-brand hover:text-brand-600 font-medium group"
                        >
                          <span className="mr-1">Read</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 relative overflow-hidden">
          <div className="bg-gradient-to-r from-brand via-brand-600 to-brand-700 rounded-3xl p-8 md:p-12 text-center relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-brand-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                Get the latest insights and analysis delivered to your inbox. Join thousands of Detroit property professionals.
              </p>
              
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent border-0"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-accent text-brand-900 font-bold rounded-xl hover:bg-accent-light transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-gray-200 mt-4">
                  No spam, unsubscribe at any time
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}