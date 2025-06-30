import React from 'react';
import { Building2, Target, Eye, Heart, Lightbulb, Shield, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-700 via-brand to-brand-900 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
            alt="Modern office building"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand-900/80"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm backdrop-blur-sm border border-accent/30">
                🏢 About Our Company
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforming Detroit Through{' '}
              <span className="text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                AI Innovation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Propvia is revolutionizing commercial property analysis through advanced AI and data analytics, 
              helping businesses make smarter real estate decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Mission */}
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand">Our Mission</h2>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 group-hover:shadow-lg transition-all duration-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To empower businesses with data-driven insights and AI-powered analytics, making commercial 
                    property decisions more transparent, efficient, and profitable while transforming Detroit's 
                    urban landscape one property at a time.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-brand" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand">Our Vision</h2>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 group-hover:shadow-lg transition-all duration-300">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To become the global standard for commercial property analysis, helping businesses worldwide 
                    unlock the full potential of their real estate investments and create thriving, sustainable 
                    communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-brand">Our Values</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The core principles that guide everything we do and shape our company culture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand">Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Continuously pushing boundaries with cutting-edge technology and AI solutions that transform the industry.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600">→ Leading Edge Technology</span>
                </div>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand">Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Providing clear, actionable insights backed by reliable data and honest communication at every step.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-sm font-semibold text-green-600">→ Clear Data Insights</span>
                </div>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand">Excellence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Delivering the highest quality analysis and customer service, exceeding expectations every time.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-sm font-semibold text-purple-600">→ Premium Quality</span>
                </div>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand">Integrity</h3>
                <p className="text-gray-600 leading-relaxed">
                  Building trust through honest, ethical business practices and genuine commitment to our community.
                </p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <span className="text-sm font-semibold text-orange-600">→ Ethical Practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-brand mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Real numbers that demonstrate our commitment to transforming Detroit's property landscape
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-gray-600 font-medium">Properties Analyzed</div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  150+
                </div>
                <div className="text-gray-600 font-medium">Happy Clients</div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  95%
                </div>
                <div className="text-gray-600 font-medium">Accuracy Rate</div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-gray-600 font-medium">AI Analysis</div>
                <div className="w-12 h-1 bg-accent mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">
              Ready to Transform Your Property Investment?
            </h2>
            <p className="text-xl text-brand-800 mb-10 max-w-2xl mx-auto font-medium">
              Join hundreds of investors and businesses who trust Propvia to make smarter real estate decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group inline-flex items-center px-8 py-4 bg-brand text-white font-bold rounded-xl hover:bg-brand-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Start Your Analysis
                <Building2 className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm text-brand-900 font-semibold rounded-xl hover:bg-white transition-all duration-300 border border-white/40 hover:border-white shadow-lg hover:shadow-xl">
                Contact Our Team
                <Users className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}