import React from "react";
import { Link } from "react-router-dom";

export default function AskAiLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 my-10">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              {" "}
              Investment Location
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ask natural language questions and receive smart, personalized
            recommendations for real estate investment and development
            opportunities.
          </p>
        </div>
        {/* Query */}
        <div className="max-w-2xl mx-auto mb-12">
          {/* Ask Button */}
          <div className="flex justify-center mt-6">
            <Link to={"/ask/query"}  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg px-6 py-3 text-lg">
              Try Ask-AI
            </Link>
          </div>
        </div>
        {/* Example Queries */}
        <div className="text-center mb-16 w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            Try these example questions:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group cursor-default">
              <p className="text-gray-700 group-hover:text-blue-600 transition-colors">
                Where should I open a daycare?
              </p>
            </button>
            <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group cursor-default">
              <p className="text-gray-700 group-hover:text-blue-600 transition-colors">
                Best place for a small café under $200k
              </p>
            </button>
            <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group cursor-default">
              <p className="text-gray-700 group-hover:text-blue-600 transition-colors">
                Which areas are good for a coworking hub?
              </p>
            </button>
            <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group cursor-default">
              <p className="text-gray-700 group-hover:text-blue-600 transition-colors">
                Where can I find retail space for a boutique?
              </p>
            </button>
            <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group cursor-default">
              <p className="text-gray-700 group-hover:text-blue-600 transition-colors">
                Best neighborhoods for a fitness studio?
              </p>
            </button>
            <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group cursor-default">
              <p className="text-gray-700 group-hover:text-blue-600 transition-colors">
                Where should I invest in rental properties?
              </p>
            </button>
          </div>
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Smart analysis */}
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trending-up text-blue-600"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Smart Analysis
            </h3>
            <p className="text-gray-600 leading-relaxed">
              AI-powered analysis of opportunity scores, community metrics, and
              market trends to find the best locations.
            </p>
          </div>
          {/* Location intelligence */}
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin text-teal-600"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Location Intelligence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Comprehensive neighborhood data including zoning, demographics,
              and competitor analysis for informed decisions.
            </p>
          </div>
          {/* Personalized results */}
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users text-orange-600"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Personalized Results
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Tailored recommendations based on your budget, business type, and
              investment goals with detailed justifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
