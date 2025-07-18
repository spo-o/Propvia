import React from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

const resources = [
  {
    id: 'checklist',
    title: 'Property Analysis Checklist',
    description: 'A comprehensive checklist for evaluating commercial properties',
    format: 'PDF',
    icon: FileText,
    url: '/resources/property-analysis-checklist.pdf'
  },
  {
    id: 'market-research',
    title: 'Market Research Template',
    description: 'Template for conducting thorough market research',
    format: 'Excel',
    icon: Table,
    url: '/resources/market-research-template.xlsx'
  },
  {
    id: 'calculator',
    title: 'Investment Calculator',
    description: 'Tool for calculating potential returns on investment',
    format: 'Excel',
    icon: Table,
    url: '/resources/investment-calculator.xlsx'
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence Worksheet',
    description: 'Detailed worksheet for property due diligence',
    format: 'PDF',
    icon: FileText,
    url: '/resources/due-diligence-worksheet.pdf'
  }
];

export default function DownloadableResources() {
  const showToast = useToastStore(state => state.showToast);

  const handleDownload = (resource: typeof resources[0]) => {
    showToast(`Coming Soon: ${resource.title} will be available for download shortly!`, 'info');
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Professional Resources
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Download our expertly crafted tools and templates to streamline your property analysis workflow
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div 
              key={resource.id} 
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-200"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-brand to-brand-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{resource.title}</h3>
                    <span className="inline-block text-sm font-semibold text-brand bg-brand/10 px-3 py-1 rounded-full">
                      {resource.format}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>
              
              <button
                onClick={() => handleDownload(resource)}
                className="w-full group/btn flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:from-brand hover:to-brand-600 hover:shadow-lg"
              >
                <Download className="w-5 h-5 mr-3 transition-transform duration-300 group-hover/btn:scale-110" />
                <span>Download Resource</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}