import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Brain, TrendingUp, Mail, MapPin, Users, DollarSign, Shield, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-700 via-brand to-brand-900 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80"
            alt="Detroit cityscape"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/80 to-brand-900/60"></div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-pulse md:top-20 md:right-20 md:w-32 md:h-32"></div>
        <div className="absolute bottom-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000 md:bottom-40 md:left-20 md:w-24 md:h-24"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm backdrop-blur-sm border border-accent/30">
                🏢 AI-Powered Urban Development
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Turn Vacant Properties into{" "}
              <span className="text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Community Assets
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl leading-relaxed">
              Detroit has over 30,000 vacant properties. Our AI platform
              analyzes zoning, foot traffic, and community needs to recommend
              high-impact opportunities—from cafés to daycares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/platform"
                className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-accent text-brand-900 font-bold rounded-xl hover:bg-accent-light transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-sm sm:text-base"
              >
                Get Free Property Analysis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform sm:ml-3 sm:w-6 sm:h-6" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 text-sm sm:text-base"
              >
                Learn More
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform sm:ml-3 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white py-20 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  30K+
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  Vacant Properties
                </div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  85%
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  Analysis Accuracy
                </div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  $2.1B
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  Investment Potential
                </div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  12K+
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  Jobs Created
                </div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering different stakeholders to transform Detroit's urban
              landscape
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                For Investors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Buy properties with 200%+ ROI potential. AI predicts cash flow,
                identifies hidden risks, and checks zoning laws in 60 seconds.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className="text-sm font-semibold text-accent">
                  → Smart Investment Decisions
                </span>
              </div>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                For Small Businesses
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Open your dream business with 98% confidence. AI tells you which
                location will match your goals and maximize profit.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className="text-sm font-semibold text-accent">
                  → Perfect Location Match
                </span>
              </div>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                For Municipalities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Cut vacancy rates and boost tax revenue. AI analyzes projects
                that increase jobs and community value.
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className="text-sm font-semibold text-accent">
                  → Community Growth
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform vacant properties into thriving
              community assets
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-brand to-brand-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl font-bold">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                Select Property
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Choose any vacant property in Detroit or enter an address for
                instant analysis with our advanced mapping system
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent-light text-brand-900 rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <Brain className="w-10 h-10" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                AI Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Get comprehensive 57-point analysis of property potential,
                market trends, and community impact in real-time
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl font-bold">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-brand">
                Take Action
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                Receive detailed recommendations, financial projections, and
                actionable next steps to move forward
              </p>
            </div>
          </div>

          {/* Process Flow Line */}
          <div className="hidden md:block relative mt-16">
            <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand via-accent to-brand-600 transform -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 bg-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large geometric shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand/10 to-brand-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-accent/5 to-brand/5 rounded-full blur-3xl animate-pulse delay-500"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                linear-gradient(rgba(0,61,60,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,61,60,0.1) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
              }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main CTA Content */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent/20 to-accent/10 rounded-full border border-accent/30 mb-8">
                <span className="text-2xl mr-2">🏙️</span>
                <span className="font-bold text-brand">
                  Ready to Make an Impact?
                </span>
              </div>

              <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-brand via-brand-600 to-accent bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="text-gray-900">Detroit Together</span>
              </h2>

              <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Join the movement of investors, entrepreneurs, and community
                leaders who are
                <span className="font-bold text-brand">
                  {" "}
                  rebuilding Detroit
                </span>{" "}
                one property at a time
              </p>
            </div>

            {/* Interactive CTA Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand mb-4">
                    Start Analysis
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Get instant AI-powered insights on any Detroit property
                  </p>
                  <div className="text-sm text-accent font-semibold">
                    100% Free • No Signup Required
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-accent to-accent-light rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 transform scale-105">
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-brand-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-900 mb-4">
                    AI-Powered
                  </h3>
                  <p className="text-brand-800 mb-6">
                    57-point analysis in under 60 seconds
                  </p>
                  <Link
                    to="/platform"
                    className="inline-flex items-center px-8 py-4 bg-white text-brand-900 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 group-hover:scale-105 shadow-lg"
                  >
                    Try It Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-brand-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand mb-4">
                    Join Community
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Connect with fellow Detroit changemakers
                  </p>
                  <div className="text-sm text-brand font-semibold">
                    500+ Active Members
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Indicators */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-brand mb-2">
                  Trusted by Detroit's Best
                </h4>
                <p className="text-gray-600">
                  Join investors, entrepreneurs, and city planners transforming
                  our city
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-3xl mb-2">🏢</div>
                  <div className="text-2xl font-bold text-brand group-hover:scale-110 transition-transform">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">
                    Properties Analyzed
                  </div>
                </div>
                <div className="group">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-brand group-hover:scale-110 transition-transform">
                    4.9/5
                  </div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
                <div className="group">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="text-2xl font-bold text-brand group-hover:scale-110 transition-transform">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">
                    Businesses Launched
                  </div>
                </div>
                <div className="group">
                  <div className="text-3xl mb-2">💼</div>
                  <div className="text-2xl font-bold text-brand group-hover:scale-110 transition-transform">
                    $2.1B
                  </div>
                  <div className="text-sm text-gray-600">
                    Investment Potential
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}