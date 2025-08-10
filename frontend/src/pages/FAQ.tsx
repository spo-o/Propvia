import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: "What is Propvia?",
      answer: "Propvia is an AI-powered commercial property analysis platform that helps businesses make data-driven real estate decisions through advanced analytics and market insights."
    },
    {
      question: "How accurate are the property analyses?",
      answer: "Our analyses are based on comprehensive data from multiple reliable sources and use advanced AI algorithms. While we strive for high accuracy, we recommend using our insights as part of a broader due diligence process."
    },
    {
      question: "What subscription plans do you offer?",
      answer: "We offer several plans ranging from Free to Enterprise, each with different features and capabilities. Visit our pricing page to compare plans and find the best fit for your needs."
    },
    {
      question: "Can I export analysis reports?",
      answer: "Yes, all paid plans include the ability to export detailed PDF reports of your property analyses, which can be shared with stakeholders or used for presentations."
    },
    {
      question: "How often is market data updated?",
      answer: "Our market data is updated in real-time for most metrics, with some specialized data points updated on a weekly or monthly basis, depending on the source."
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, our Enterprise plan includes custom features, integrations, and dedicated support. Contact our sales team to discuss your specific needs."
    }
  ];

  const handleContactSupport = () => {
    window.location.href = 'mailto:hello@propvia.com';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-brand-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-brand mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Our team is here to help. Contact us for more information about our services.
        </p>
        <button 
          onClick={handleContactSupport}
          className="inline-block px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}