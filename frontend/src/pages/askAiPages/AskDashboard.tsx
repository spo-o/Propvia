import React, { useState } from "react";
import SearchQuery from "./SearchQuery";
import SavedQueries from "./SavedQueries";

export default function AskDashboard() {
  const [tab, setTab] = useState<"savedList" | "query">("query");
  
  // Mock data for saved queries - replace with actual data from your API
  const savedQueries = [
    {
      id: 1,
      query: "Best place for a small café under $200k",
      date: "2025-01-15",
      results: 12
    },
    {
      id: 2,
      query: "Where should I invest in rental properties?",
      date: "2025-01-10",
      results: 8
    },
    {
      id: 3,
      query: "Retail space for boutique in downtown area",
      date: "2025-01-08",
      results: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                AI-Powered Property Search
              </h1>
              <p className="text-lg text-gray-600">
                Find your perfect investment location with intelligent recommendations
              </p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setTab("query")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === "query"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  New Query
                </div>
              </button>
              <button
                onClick={() => setTab("savedList")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === "savedList"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11Z"/>
                  </svg>
                  Saved Queries
                  {savedQueries.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full ml-1">
                      {savedQueries.length}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">
              {tab === "query" ? "New Query" : "Saved Queries"}
            </span>
          </nav>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          <div className="transition-all duration-300 ease-in-out">
            {tab === "query" ? (
              <SearchQuery changeTab={() => setTab("savedList")} />
            ) : (
              <SavedQueries 
                list={savedQueries} 
                onSelectQuery={(query) => {
                  setTab("query");
                  // TODO: Pass selected query to SearchQuery component
                }} 
                onBackToQuery={() => setTab("query")}
              />
            )}
          </div>
        </div>

        {/* Footer Stats */}
        {tab === "query" && (
          <div className="max-w-6xl mx-auto mt-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="group">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">50K+</h3>
                  <p className="text-gray-600">Properties Analyzed</p>
                </div>
                
                <div className="group">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal-600"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                  <p className="text-gray-600">Cities Covered</p>
                </div>
                
                <div className="group">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
                  <p className="text-gray-600">Happy Investors</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
