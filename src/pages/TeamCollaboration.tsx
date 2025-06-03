import React from 'react';
import { Users, UserPlus, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeamCollaboration() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <div className="text-center max-w-lg">
        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Team Collaboration</h2>
        <p className="text-gray-600 mb-6">
          Collaborate with your team to analyze properties, share insights, and make better investment decisions together.
        </p>
        <div className="space-y-4">
          <button 
            disabled
            className="w-full px-6 py-3 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center cursor-not-allowed relative group"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Invite Team Members
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-brand text-white px-3 py-1 rounded text-sm whitespace-nowrap">
              Coming Soon!
            </span>
          </button>
          <Link
            to="/guides"
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Learn About Team Features
          </Link>
        </div>
      </div>
    </div>
  );
}