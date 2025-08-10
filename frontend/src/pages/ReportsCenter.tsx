import React from 'react';
import { FileText, Building2, ArrowRight, Plus } from 'lucide-react';
import { SavedScenario } from '../types';
import { Link } from 'react-router-dom';

interface ReportsCenterProps {
  savedScenarios: SavedScenario[];
}

export default function ReportsCenter({ savedScenarios = [] }: ReportsCenterProps) {
  if (savedScenarios.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-center max-w-lg">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Reports Yet</h2>
          <p className="text-gray-600 mb-6">
            Start by analyzing properties to generate detailed reports. Each analysis will be saved here for easy access and sharing.
          </p>
          <div className="space-y-4">
            <Link 
              to="/platform"
              className="w-full px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 inline-flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Analyze Your First Property
            </Link>
            <Link
              to="/guides"
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 inline-block"
            >
              View Analysis Guide
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reports Center</h1>
        <Link 
          to="/platform"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Report</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedScenarios.map((scenario) => (
          <div key={scenario.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{scenario.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                scenario.analysis.confidence >= 80 
                  ? 'bg-green-100 text-green-800'
                  : scenario.analysis.confidence >= 60
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {scenario.analysis.confidence}% Match
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <Building2 className="w-4 h-4 mr-2" />
                <span>{scenario.property.address}</span>
              </div>
              <div className="text-sm text-gray-500">
                Created on {new Date(scenario.dateCreated).toLocaleDateString()}
              </div>
            </div>

            <button
              className="w-full px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 flex items-center justify-center"
            >
              <span>View Full Report</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}