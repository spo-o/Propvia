import React from "react";

type Props = {
    changeTab:() => void
};

export default function SearchQuery({changeTab}: Props) {
  return (
    <div>
      {/* saved queries */}
      <div className="flex justify-end my-4">
        <button onClick={changeTab} className="block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm">
          View Saved Queries
        </button>
      </div>
      {/* search */}
      <div className="relative w-full flex justify-center items-center">
        <textarea
          //   type="text"
          placeholder="What are you trying to build or invest in? Be as specific as possible..."
          className="resize-none w-full pl-12 pr-4 py-6 text-lg border-2  border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg"
        />
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
          className="absolute left-3 transform -translate-y-1/2 h-8 w-8 text-gray-400 pointer-events-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>
      {/* button */}
      <div className="flex justify-center mt-6">
        <button className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg px-6 py-3 text-lg">
          Submit Query
        </button>
      </div>
    </div>
  );
}
