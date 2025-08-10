import React from 'react';
import { Shield, Lock, Eye, UserCheck, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">Privacy Policy</h1>
          <p className="text-xl text-center text-emerald-100 mb-6">
            Your privacy is important to us. Learn how we protect and use your information.
          </p>
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 bg-emerald-700/50 rounded-full text-emerald-100">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Section 1: Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 rounded-lg p-3 mr-4">
                  <Eye className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-emerald-500">
                <p className="text-gray-700 mb-4 text-lg">
                  We collect information that you provide directly to us, including:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Account Information</h4>
                    <p className="text-gray-600 text-sm">Name, email, password</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Profile Information</h4>
                    <p className="text-gray-600 text-sm">Company, role, preferences</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Analysis Data</h4>
                    <p className="text-gray-600 text-sm">Property analysis and saved scenarios</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">Usage Data</h4>
                    <p className="text-gray-600 text-sm">Analytics and platform interactions</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <UserCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-700 mb-6 text-lg">
                  We use the information we collect to:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Provide and improve our services</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Personalize your experience</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Send you updates and marketing communications</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-gray-700">Ensure platform security and prevent fraud</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Data Security */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 rounded-lg p-3 mr-4">
                  <Lock className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                <p className="text-gray-700 text-lg">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </section>

            {/* Section 4: Your Rights */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                <p className="text-gray-700 mb-6 text-lg">
                  You have the right to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                    <p className="text-gray-700 font-medium">Access your personal information</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                    <p className="text-gray-700 font-medium">Correct inaccurate data</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                    <p className="text-gray-700 font-medium">Request deletion of your data</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-200">
                    <p className="text-gray-700 font-medium">Opt-out of marketing communications</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Contact Us */}
            <section className="mb-0">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 rounded-lg p-3 mr-4">
                  <Mail className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
                <p className="text-gray-700 mb-4 text-lg">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-emerald-600 mr-3" />
                      <span className="text-gray-700">
                        <strong>Email:</strong> hello@propvia.com
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-emerald-600 mr-3 mt-0.5">
                        📍
                      </div>
                      <span className="text-gray-700">
                        <strong>Address:</strong> 440 Burroughs Street #114, Detroit MI 48202
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}