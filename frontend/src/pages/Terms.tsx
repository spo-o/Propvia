import React from 'react';
import { FileText, Scale, Shield, UserCheck, CreditCard, AlertTriangle, Mail } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Scale className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-center mb-4">Terms of Service</h1>
          <p className="text-xl text-center text-slate-200 mb-6">
            Please read these terms carefully before using our platform.
          </p>
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 bg-slate-700/50 rounded-full text-slate-200">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Section 1: Acceptance of Terms */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  By accessing and using Propvia's services, you agree to be bound by these Terms of Service 
                  and all applicable laws and regulations. If you do not agree with any of these terms, you 
                  are prohibited from using or accessing our services.
                </p>
              </div>
            </section>

            {/* Section 2: Use License */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Use License</h2>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Permission is granted to temporarily access and use Propvia's services for personal, 
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
              </div>
            </section>

            {/* Section 3: Service Description */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <UserCheck className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Service Description</h2>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Propvia provides AI-powered commercial property analysis and insights. While we strive for 
                  accuracy, we do not guarantee the completeness or accuracy of our analysis. Users should 
                  conduct their own due diligence before making investment decisions.
                </p>
              </div>
            </section>

            {/* Section 4: User Obligations */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-100 rounded-lg p-3 mr-4">
                  <UserCheck className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">User Obligations</h2>
              </div>
              <div className="bg-emerald-50 rounded-xl p-6 border-l-4 border-emerald-500">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-200">
                    <div className="flex items-center mb-2">
                      <div className="bg-emerald-500 rounded-full p-1 mr-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h4 className="font-semibold text-gray-900">Account Information</h4>
                    </div>
                    <p className="text-gray-600 text-sm">Maintain accurate account information</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-200">
                    <div className="flex items-center mb-2">
                      <div className="bg-emerald-500 rounded-full p-1 mr-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h4 className="font-semibold text-gray-900">Security</h4>
                    </div>
                    <p className="text-gray-600 text-sm">Protect account credentials</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-200">
                    <div className="flex items-center mb-2">
                      <div className="bg-emerald-500 rounded-full p-1 mr-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h4 className="font-semibold text-gray-900">Legal Compliance</h4>
                    </div>
                    <p className="text-gray-600 text-sm">Use services in compliance with laws</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-emerald-200">
                    <div className="flex items-center mb-2">
                      <div className="bg-emerald-500 rounded-full p-1 mr-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <h4 className="font-semibold text-gray-900">Intellectual Property</h4>
                    </div>
                    <p className="text-gray-600 text-sm">Respect intellectual property rights</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Subscription Terms */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 rounded-lg p-3 mr-4">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Subscription Terms</h2>
              </div>
              <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Subscription fees are billed in advance on a monthly or annual basis. Cancellations take 
                    effect at the end of the current billing period. No refunds are provided for partial months.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6: Limitation of Liability */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 rounded-lg p-3 mr-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-red-200">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Propvia shall not be liable for any indirect, incidental, special, consequential, or 
                    punitive damages resulting from your use or inability to use our services.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7: Contact Information */}
            <section className="mb-0">
              <div className="flex items-center mb-6">
                <div className="bg-slate-100 rounded-lg p-3 mr-4">
                  <Mail className="h-6 w-6 text-slate-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-slate-500">
                <p className="text-gray-700 mb-4 text-lg">
                  Questions about the Terms of Service should be sent to:
                </p>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-slate-600 mr-3" />
                      <span className="text-gray-700">
                        <strong>Email:</strong> hello@propvia.com
                      </span>
                    </div>
                    <div className="flex items-start">
                      <div className="h-5 w-5 text-slate-600 mr-3 mt-0.5">
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