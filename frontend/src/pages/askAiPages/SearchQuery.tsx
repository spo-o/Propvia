import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  changeTab: () => void;
};

interface PropertyResult {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
}

export default function SearchQuery({ changeTab }: Props) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<PropertyResult[]>([]);

  const handleSubmit = async () => {
    if (!query.trim()) {
      console.warn("Query is empty. Submission skipped.");
      return;
    }

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("User not logged in. Please sign in first.");
      console.error("No user_id found in localStorage.");
      return;
    }

    console.log("Submitting query:", query);
    console.log("User ID:", userId);

    setIsLoading(true);
    setResults([]);
    try {
      const res = await fetch("/api/ask_ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId,
          prompt: query,
        }),
      });

      console.log("Response status:", res.status);
      if (!res.ok) {
        const error = await res.json();
        console.error("Backend responded with error:", error);
        alert("Error: " + (error.error || "Invalid input"));
        return;
      }

      const data = await res.json();
      console.log("ASK AI result:", data);

      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        alert("No matching properties found.");
      }
    } catch (error) {
      console.error("ASK AI request failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Ask Our AI Assistant
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Describe your investment goals and get personalized property
          recommendations powered by AI
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link
          to="/ask/limit-reached"
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
        >
          🧪 Test Limit Page
        </Link>

        <button
          onClick={changeTab}
          className="group flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 group-hover:text-blue-600 transition-colors"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11Z" />
          </svg>
          View Saved Queries
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
        <div className="relative mb-6">
          <div className="absolute left-4 top-6 z-10">
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
              className="text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you trying to build or invest in? Be as specific as possible..."
            className="w-full pl-14 pr-4 py-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none outline-none placeholder-gray-400"
            rows={4}
            disabled={isLoading}
          />

          <div className="absolute bottom-3 right-4 text-sm text-gray-400">
            {query.length}/500
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleSubmit}
            disabled={!query.trim() || isLoading}
            className="group relative inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg px-8 py-4 text-lg min-w-[200px]"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                Submit Query
              </>
            )}
          </button>

          <button
            onClick={() => setQuery("")}
            disabled={!query || isLoading}
            className="inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 text-base"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Clear
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            💡 Press{" "}
            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
              Ctrl + Enter
            </kbd>{" "}
            to submit quickly
          </p>
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
             Top Property Matches
          </h3>
          <ul className="space-y-4">
            {results.map((res, idx) => (
              <li
                key={res.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <p className="text-gray-900 font-medium">
                  {idx + 1}. {res.address}
                </p>
                <p className="text-gray-600 text-sm">
                  Latitude: {res.latitude} | Longitude: {res.longitude}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-center mt-12">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Need inspiration? Try these examples:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {[
            "Find me a retail space for a coffee shop under $300k in downtown areas",
            "Best neighborhoods for rental property investment with high ROI",
            "Where should I open a co-working space with good foot traffic?",
            "Affordable commercial spaces suitable for a fitness studio",
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setQuery(example)}
              disabled={isLoading}
              className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="text-gray-700 group-hover:text-blue-700 transition-colors text-sm">
                "{example}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
