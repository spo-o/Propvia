import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Brain, TrendingUp, Mail, MapPin, Users, DollarSign, Shield, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-brand min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80"
            alt="Detroit cityscape"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Turn Vacant Properties into{' '}
              <span className="text-accent">Community Assets</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Detroit has over 30,000 vacant properties. Our AI platform analyzes zoning, foot traffic, and community needs to recommend high-impact opportunities—from cafés to daycares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/platform"
                className="inline-flex items-center px-6 py-3 bg-accent text-brand font-medium rounded-lg hover:bg-accent-dark transition-colors"
              >
                Get Free Property Analysis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand mb-2">30K+</div>
              <div className="text-gray-600">Vacant Properties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand mb-2">85%</div>
              <div className="text-gray-600">Analysis Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand mb-2">$2.1B</div>
              <div className="text-gray-600">Investment Potential</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand mb-2">12K+</div>
              <div className="text-gray-600">Jobs Created</div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Building2 className="w-12 h-12 text-brand mb-4" />
              <h3 className="text-xl font-semibold mb-2">For Investors</h3>
              <p className="text-gray-600">
                Buy properties with 200%+ ROI potential. AI predicts cash flow, identifies hidden risks, and checks zoning laws in 60 seconds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Building2 className="w-12 h-12 text-brand mb-4" />
              <h3 className="text-xl font-semibold mb-2">For Small Businesses</h3>
              <p className="text-gray-600">
                Open your dream business with 98% confidence. AI tells you which location will match your goals and maximize profit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <TrendingUp className="w-12 h-12 text-brand mb-4" />
              <h3 className="text-xl font-semibold mb-2">For Municipalities</h3>
              <p className="text-gray-600">
                Cut vacancy rates and boost tax revenue. AI analyzes projects that increase jobs and community value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Property</h3>
              <p className="text-gray-600">
                Choose any vacant property in Detroit or enter an address for instant analysis
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Get comprehensive 57-point analysis of property potential and community impact
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Action</h3>
              <p className="text-gray-600">
                Receive detailed recommendations, financial projections, and next steps
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Detroit?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in revitalizing Detroit's neighborhoods while building profitable businesses that serve community needs.
          </p>
          <Link
            to="/platform"
            className="inline-flex items-center px-8 py-4 bg-accent text-brand font-medium rounded-lg hover:bg-accent-dark transition-colors text-lg"
          >
            Start Free Analysis
            <ArrowRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}