import React, { useState } from 'react';
import { Settings, Bell, Star, Clock, FileText, Building2, Users, Tag, Info } from 'lucide-react';
import * as Select from '@radix-ui/react-select';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';
import { SavedScenario } from '../types';
import { useAuthStore } from '../store/authStore';

interface UserDashboardProps {
  savedScenarios: SavedScenario[];
}

export default function UserDashboard({ savedScenarios }: UserDashboardProps) {
  const { user } = useAuthStore();

  // Count analyzed properties (properties currently being analyzed or in saved scenarios)
  const analyzedPropertiesCount = savedScenarios.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
          <p className="text-gray-600">Here's what's happening with your properties</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Analyzed Properties</h3>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Info className="w-5 h-5" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-white p-3 rounded-lg shadow-lg border max-w-xs"
                    sideOffset={5}
                  >
                    Properties that have been analyzed or have saved analysis scenarios.
                    <Tooltip.Arrow className="fill-white" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analyzedPropertiesCount}</p>
          <p className="text-sm text-gray-600">
            {analyzedPropertiesCount === 0 ? 'No properties analyzed yet' : `${analyzedPropertiesCount} propert${analyzedPropertiesCount === 1 ? 'y' : 'ies'} analyzed`}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Saved Scenarios</h3>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{savedScenarios.length}</p>
          <p className="text-sm text-gray-600">
            {savedScenarios.length === 0 ? 'No scenarios saved yet' : 'Last updated 2 hours ago'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">1</p>
          <p className="text-sm text-gray-600">Just you for now</p>
        </div>
      </div>

      {savedScenarios.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
          <p className="text-gray-600 mb-6">
            Start by analyzing properties to track your portfolio and generate insights.
          </p>
          <button
            onClick={() => window.location.href = '/platform'}
            className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600"
          >
            Analyze Your First Property
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {savedScenarios.slice(0, 3).map((scenario, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{scenario.name}</p>
                    <p className="text-sm text-gray-600">{scenario.property.address}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(scenario.dateCreated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h3>
            <div className="space-y-4">
              {savedScenarios.slice(0, 3).map((scenario, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{scenario.property.address}</h4>
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
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-1" />
                      <span>{scenario.property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>
                        {new Date(scenario.dateCreated).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}