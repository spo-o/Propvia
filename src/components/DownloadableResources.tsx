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
    <div className="bg-gray-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloadable Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <div key={resource.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-brand" />
                    <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{resource.description}</p>
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {resource.format}
                </span>
              </div>
              <button
                onClick={() => handleDownload(resource)}
                className="mt-4 flex items-center text-brand hover:text-brand-600"
              >
                <Download className="w-4 h-4 mr-2" />
                <span>Download</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}