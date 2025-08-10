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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Here's what's happening with your properties</p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-md rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Analyzed Properties</h3>
              <div className="p-2 bg-blue-100 rounded-xl">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              {analyzedPropertiesCount}
            </p>
            <p className="text-sm text-gray-600">
              {analyzedPropertiesCount === 0 ? 'No properties analyzed yet' : `${analyzedPropertiesCount} propert${analyzedPropertiesCount === 1 ? 'y' : 'ies'} analyzed`}
            </p>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="mt-3 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    What's this?
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

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Saved Scenarios</h3>
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
              {savedScenarios.length}
            </p>
            <p className="text-sm text-gray-600">
              {savedScenarios.length === 0 ? 'No scenarios saved yet' : 'Ready for analysis'}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
              <div className="p-2 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              1
            </p>
            <p className="text-sm text-gray-600">Just you for now</p>
          </div>
        </div>

        {savedScenarios.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-sm p-12 rounded-2xl shadow-lg border border-white/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Analysis Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Start by analyzing properties to track your portfolio and generate valuable insights.
            </p>
            <button
              onClick={() => window.location.href = '/platform'}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold"
            >
              Analyze Your First Property
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                {savedScenarios.slice(0, 3).map((scenario, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50/70 rounded-xl hover:bg-gray-100/70 transition-colors duration-200">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{scenario.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{scenario.property.address}</p>
                      <p className="text-xs text-blue-600 font-medium">
                        {new Date(scenario.dateCreated).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Analysis Summary</h3>
              </div>
              <div className="space-y-4">
                {savedScenarios.slice(0, 3).map((scenario, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50/70 to-blue-50/70 rounded-xl border border-gray-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 truncate pr-2">{scenario.property.address}</h4>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full shrink-0 ${
                        scenario.analysis.confidence >= 80 
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : scenario.analysis.confidence >= 60
                          ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}>
                        {scenario.analysis.confidence}% Match
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1 text-blue-500" />
                        <span className="font-medium">{scenario.property.sqft.toLocaleString()} sqft</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
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
    </div>
  );
}