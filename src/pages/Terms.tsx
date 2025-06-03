import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using Propvia's services, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations. If you do not agree with any of these terms, you 
            are prohibited from using or accessing our services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
          <p className="text-gray-600">
            Permission is granted to temporarily access and use Propvia's services for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Service Description</h2>
          <p className="text-gray-600">
            Propvia provides AI-powered commercial property analysis and insights. While we strive for 
            accuracy, we do not guarantee the completeness or accuracy of our analysis. Users should 
            conduct their own due diligence before making investment decisions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Obligations</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Maintain accurate account information</li>
            <li>Protect account credentials</li>
            <li>Use services in compliance with laws</li>
            <li>Respect intellectual property rights</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Subscription Terms</h2>
          <p className="text-gray-600">
            Subscription fees are billed in advance on a monthly or annual basis. Cancellations take 
            effect at the end of the current billing period. No refunds are provided for partial months.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-600">
            Propvia shall not be liable for any indirect, incidental, special, consequential, or 
            punitive damages resulting from your use or inability to use our services.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
          <p className="text-gray-600">
            Questions about the Terms of Service should be sent to:
            <br />
            Email: hello@propvia.com
            <br />
            Address: 440 Burroughs Street #114, Detroit MI 48202
          </p>
        </section>
      </div>
    </div>
  );
}