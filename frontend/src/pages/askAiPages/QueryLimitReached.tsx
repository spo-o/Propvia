import React from "react";
import { Link } from "react-router-dom";

type Props = {
  userTier?: "free" | "starter" | "pro" | "team";
  queriesUsed?: number;
  queryLimit?: number;
  resetDate?: string;
  onUpgrade?: () => void;
  onBackToDashboard?: () => void;
};

export default function QueryLimitReached({
  userTier = "free",
  queriesUsed = 0,
  queryLimit = 0,
  resetDate = "2025-02-24",
  onUpgrade,
  onBackToDashboard
}: Props) {
  
  const formatResetDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTierInfo = () => {
    switch (userTier) {
      case "free":
        return {
          name: "Free Explorer",
          nextTier: "Starter",
          nextLimit: "3-4",
          price: "$20/month",
          yearlyPrice: "$200/year"
        };
      case "starter":
        return {
          name: "Starter",
          nextTier: "Pro Builder",
          nextLimit: "Unlimited",
          price: "$65/month",
          yearlyPrice: "$650/year"
        };
      case "pro":
        return {
          name: "Pro Builder",
          nextTier: "Visionary Team",
          nextLimit: "Unlimited",
          price: "$135/month",
          yearlyPrice: "$1,350/year"
        };
      case "team":
        return {
          name: "Visionary Team",
          nextTier: "Enterprise",
          nextLimit: "Unlimited",
          price: "Contact Sales",
          yearlyPrice: "Custom Pricing"
        };
      default:
        return {
          name: "Free Explorer",
          nextTier: "Starter",
          nextLimit: "3-4",
          price: "$20/month",
          yearlyPrice: "$200/year"
        };
    }
  };

  const tierInfo = getTierInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-600"
              >
                <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Ask AI Not Available
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ask AI is not included in the Free Explorer plan. 
              Upgrade to Starter plan to unlock AI-powered property search queries.
            </p>
          </div>

          {/* Usage Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Current Plan - {tierInfo.name}
              </h2>
              
              {/* Feature Limitation Message */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      className="text-orange-600"
                    >
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ask AI Feature Locked</h3>
                    <p className="text-sm text-gray-700">
                      Ask AI is available starting with the Starter plan (3-4 queries/month)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Info */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    className="text-blue-600"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                    <path d="M16 16h5v5"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Query Reset</h3>
                  <p className="text-sm text-gray-600">
                    Your queries will reset on <span className="font-medium">{formatResetDate(resetDate)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* What you can do */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: Upgrade */}
              <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upgrade Now
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Access Ask AI feature with {tierInfo.nextLimit} queries/month
                  </p>
                  <button
                    onClick={onUpgrade}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Upgrade to {tierInfo.nextTier}
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Starting at {tierInfo.price} ({tierInfo.yearlyPrice})
                  </p>
                </div>
              </div>

              {/* Option 2: Wait */}
              <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50/50">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
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
                      className="text-gray-600"
                    >
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Wait for Reset
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Stay on Free Explorer plan (no Ask AI access)
                  </p>
                  <button
                    onClick={onBackToDashboard}
                    className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    Back to Dashboard
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Resets on {formatResetDate(resetDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Upgrade Benefits */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-8">
              Why Upgrade to {tierInfo.nextTier}?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
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
                    className="text-green-600"
                  >
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">More AskAI Queries</h3>
                <p className="text-sm text-gray-600">
                  {tierInfo.nextLimit === "Unlimited" 
                    ? 'Unlimited AI-powered property searches'
                    : `${tierInfo.nextLimit} AI-powered searches per month`
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
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
                    className="text-purple-600"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Priority Support</h3>
                <p className="text-sm text-gray-600">
                  Faster response times and dedicated assistance
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
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
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Features</h3>
                <p className="text-sm text-gray-600">
                  Detailed analytics and market insights
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8">
              <button
                onClick={onUpgrade}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-lg"
              >
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
                >
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
                Start Your {tierInfo.nextTier} Plan
              </button>
              <p className="text-sm text-gray-500 mt-2">
                30-day money-back guarantee
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link 
              to="/ask"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
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
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
              Back to Ask AI Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
