import React from 'react';
import { Shield, Lock, Key, Server, FileCheck, Users } from 'lucide-react';

export default function Security() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Security</h1>
      
      <div className="prose prose-lg">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-brand mr-3" />
                <h3 className="font-semibold">Enterprise-Grade Security</h3>
              </div>
              <p className="text-gray-600">
                Your data is protected by industry-leading security measures, including end-to-end encryption and secure data centers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-brand mr-3" />
                <h3 className="font-semibold">Access Control</h3>
              </div>
              <p className="text-gray-600">
                Role-based access control ensures team members only see what they need to see.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Infrastructure</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Server className="w-6 h-6 text-brand mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Secure Infrastructure</h3>
                <p className="text-gray-600">
                  Our infrastructure is hosted on AWS with multiple layers of redundancy and security.
                  Regular security audits and penetration testing ensure your data stays protected.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Key className="w-6 h-6 text-brand mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-gray-600">
                  Multi-factor authentication and secure password policies protect your account.
                  All sessions are encrypted and regularly validated.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FileCheck className="w-6 h-6 text-brand mr-3" />
                <h3 className="font-semibold">Regulatory Compliance</h3>
              </div>
              <p className="text-gray-600">
                We maintain compliance with GDPR, CCPA, and other relevant data protection regulations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-brand mr-3" />
                <h3 className="font-semibold">Privacy Protection</h3>
              </div>
              <p className="text-gray-600">
                Your privacy is our priority. We never share or sell your data to third parties.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Security Team</h2>
          <p className="text-gray-600 mb-6">
            For security concerns or to report vulnerabilities, contact our security team:
          </p>
          <div className="bg-brand-50 p-6 rounded-lg">
            <p className="text-brand font-medium">Email: security@propvia.com</p>
            <p className="text-brand font-medium">Emergency: +1 (313) 555-0199</p>
          </div>
        </section>
      </div>
    </div>
  );
}