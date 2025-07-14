import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToastStore } from "../store/toastStore";

const API_BASE_URL = "http://localhost:5050/api";

export default function PaymentProcessingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToastStore(state => state.showToast);

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [propertyRequestId, setPropertyRequestId] = useState<string | null>(
    null
  );
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "paid" | "failed" | "timeout"
  >("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError(
        "No Stripe session ID found in the URL. Please try again from the beginning."
      );
      setLoading(false);
      showToast("Payment link invalid or expired.", "error");
      return;
    }

    let pollingIntervalId: NodeJS.Timeout | null = null;
    let overallTimeoutId: NodeJS.Timeout | null = null;

    const initiatePaymentVerification = async () => {
      try {
        setLoading(true);
        setError(null);

        // fetch propertyRequestId from your backend using the Stripe sessionId
        const fetchIdResponse = await fetch(
          `${API_BASE_URL}/stripe/get-session-details/${sessionId}`
        );
        if (!fetchIdResponse.ok) {
          const errData = await fetchIdResponse.json();
          throw new Error(
            errData.error ||
              `Failed to retrieve request ID from session: ${fetchIdResponse.status}`
          );
        }
        const idData = await fetchIdResponse.json();
        const fetchedRequestId = idData.propertyRequestId;
        if (!fetchedRequestId) {
          throw new Error(
            "Property Request ID not found in Stripe session metadata."
          );
        }

        setPropertyRequestId(fetchedRequestId);

        // start polling for payment status using the fetched propertyRequestId
        const checkPaymentStatus = async () => {
          try {
            const response = await fetch(
              `${API_BASE_URL}/check-payment-status/${fetchedRequestId}`
            );
            if (!response.ok) {
              const errData = await response.json();
              if (response.status === 404) {
                console.warn(
                  `Request ID ${fetchedRequestId} not yet found or processed on backend.`
                );
                return;
              }
              throw new Error(
                errData.error || `HTTP error! status: ${response.status}`
              );
            }
            const data = await response.json();
            console.log(
              "Polling payment status for ID",
              fetchedRequestId,
              ":",
              data.paymentStatus
            );

            if (data.paymentStatus === "paid") {
              setPaymentStatus("paid");
              showToast("Payment successful! Redirecting...", "success");
              navigate(`/payment-success/${fetchedRequestId}`, {
                replace: true,
                state: { paymentConfirmed: true, fromPaymentProcessing: true },
              });
            } else {
              setPaymentStatus(data.paymentStatus);
            }
          } catch (err: any) {
            console.error("Error during polling payment status:", err);
          }
        };

        pollingIntervalId = setInterval(checkPaymentStatus, 3000);

        overallTimeoutId = setTimeout(() => {
          if (paymentStatus !== "paid") {
            setPaymentStatus("timeout");
            setError(
              "Payment confirmation timed out. Please check your order history or contact support."
            );
            showToast(
              "Payment verification timed out. Please check your order history.",
              "info"
            );
            setLoading(false);
            if (pollingIntervalId) clearInterval(pollingIntervalId);
          }
        }, 120000);
      } catch (err: any) {
        console.error("Initial payment verification setup error:", err);
        setError(
          err.message ||
            "An unexpected error occurred during payment processing setup."
        );
        setLoading(false);
        if (pollingIntervalId) clearInterval(pollingIntervalId);
        if (overallTimeoutId) clearTimeout(overallTimeoutId);
        showToast("Failed to start payment verification process.", "error");
      }
    };

    initiatePaymentVerification();

    return () => {
      if (pollingIntervalId) clearInterval(pollingIntervalId);
      if (overallTimeoutId) clearTimeout(overallTimeoutId);
    };
  }, [sessionId, navigate, showToast, paymentStatus]);

  if (!sessionId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
        <div className="max-w-xl space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Error: Missing Information
          </h2>
          <p className="text-gray-600">
            This page requires a valid payment session ID.
          </p>
          <button
            className="mt-4 px-6 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
        <div className="max-w-xl space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Status Error
          </h2>
          <p className="text-gray-600">{error}</p>
          {propertyRequestId && (
            <p className="text-gray-700 font-medium">
              Your Request ID:{" "}
              <span className="font-bold text-blue-600">
                {propertyRequestId}
              </span>
            </p>
          )}
          <p className="text-gray-600">
            For assistance, please check your order history or contact support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              className="px-6 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/my-orders")}
            >
              Check My Orders
            </button>
            <button
              className="px-6 py-3 text-lg border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => navigate("/")}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Still in loading state (either fetching initial ID or polling)
  if (loading || paymentStatus === "pending") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
        <div className="max-w-xl space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">
            Processing Your Payment...
          </h2>
          <p className="text-gray-600">
            We are confirming your payment details. This may take a few moments.
          </p>
          <p className="text-gray-600">
            Please do not close or refresh this window.
          </p>
          {/* Tailwind-styled spinner */}
          <div className="mt-8 w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Fallback if somehow not navigated but no error and not loading
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
      <div className="max-w-xl space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          Unexpected Payment State
        </h2>
        <p className="text-gray-600">
          An unexpected situation occurred. Please check your order history.
        </p>
        <button
          className="mt-4 px-6 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
