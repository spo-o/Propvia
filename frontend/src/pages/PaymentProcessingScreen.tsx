import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToastStore } from "../store/toastStore";

const API_BASE_URL = "/api";

export default function PaymentProcessingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const showToast = useToastStore(state => state.showToast);

  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [propertyRequestId, setPropertyRequestId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"initial" | "pending" | "paid" | "failed" | "timeout">("initial");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const overallTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasNavigatedRef = useRef(false);

  const checkPaymentStatus = useCallback(
    async (currentRequestId: string) => {
      if (!currentRequestId || hasNavigatedRef.current) return;
      try {
        const response = await fetch(`${API_BASE_URL}/check-payment-status/${currentRequestId}`);
        if (!response.ok) {
          const errData = await response.json();
          if (response.status === 404) {
            console.warn(`Request ID ${currentRequestId} not yet found or processed on backend.`);
            return;
          }
          throw new Error(errData.error || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.paymentStatus !== paymentStatus) {
          setPaymentStatus(data.paymentStatus);
        }
      } catch (err: any) {
        console.error("Error during polling payment status:", err);
        setPaymentStatus("failed");
        setError(err.message || "Failed to check payment status.");
        showToast("Failed to verify payment. Please check your order.", "error");
      }
    },
    [paymentStatus, showToast]
  );

  useEffect(() => {
    const initializeProcessing = async () => {
      if (!sessionId) {
        setError("No Stripe session ID found in the URL. Please try again from the beginning.");
        setLoading(false);
        showToast("Payment link invalid or expired.", "error");
        setPaymentStatus("failed");
        return;
      }

      if (paymentStatus === "initial") {
        try {
          setLoading(true);
          setError(null);

          const fetchIdResponse = await fetch(`${API_BASE_URL}/stripe/get-session-details/${sessionId}`);
          if (!fetchIdResponse.ok) {
            const errData = await fetchIdResponse.json();
            throw new Error(errData.error || `Failed to retrieve request ID from session: ${fetchIdResponse.status}`);
          }

          const idData = await fetchIdResponse.json();
          const fetchedRequestId = idData.propertyRequestId;

          setPropertyRequestId(fetchedRequestId || null); // null if it's a subscription
          setLoading(false);
          setPaymentStatus("pending");
        } catch (err: any) {
          console.error("Initial payment verification setup error:", err);
          setError(err.message || "An unexpected error occurred during payment processing setup.");
          setLoading(false);
          setPaymentStatus("failed");
          showToast("Failed to start payment verification process.", "error");
        }
      }
    };

    initializeProcessing();

    if (
      paymentStatus === "pending" &&
      (propertyRequestId || propertyRequestId === null) &&
      !pollingIntervalRef.current &&
      !hasNavigatedRef.current
    ) {
      pollingIntervalRef.current = setInterval(() => {
        checkPaymentStatus(propertyRequestId || sessionId!);
      }, 3000);

      overallTimeoutRef.current = setTimeout(() => {
        if (paymentStatus === "pending" && !hasNavigatedRef.current) {
          setPaymentStatus("timeout");
          setError("Payment confirmation timed out. Please check your order history or contact support.");
          showToast("Payment verification timed out. Please check your order history.", "info");
        }
      }, 120000);
    }

    if ((propertyRequestId || propertyRequestId === null) && !hasNavigatedRef.current) {
      if (paymentStatus === "paid") {
        hasNavigatedRef.current = true;
        showToast("Payment successful! Redirecting...", "success");

        // Redirect logic:
        if (propertyRequestId) {
          // Custom Property Analysis
          navigate(`/payment-success/${propertyRequestId}`, {
            replace: true,
            state: { paymentConfirmed: true, fromPaymentProcessing: true },
          });
        } else {
          // Subscription signup flow
          navigate("/login", { replace: true });
        }
      } else if (["failed", "timeout"].includes(paymentStatus)) {
        hasNavigatedRef.current = true;
      }
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      if (overallTimeoutRef.current) {
        clearTimeout(overallTimeoutRef.current);
        overallTimeoutRef.current = null;
      }
    };
  }, [
    sessionId,
    paymentStatus,
    propertyRequestId,
    navigate,
    showToast,
    checkPaymentStatus,
  ]);

  if (!sessionId) {
    return renderError("Missing Information", "This page requires a valid payment session ID.", navigate);
  }

  if (error) {
    return renderError("Payment Status Error", error, navigate, propertyRequestId);
  }

  if (loading || paymentStatus === "pending" || paymentStatus === "initial") {
    return renderLoading();
  }

  return renderError("Unexpected Payment State", "An unexpected situation occurred. Please check your order history.", navigate);
}

// Helper components
function renderError(title: string, message: string, navigate: any, requestId?: string | null) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
      <div className="max-w-xl space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{message}</p>
        {requestId && (
          <p className="text-gray-700 font-medium">
            Your Request ID: <span className="font-bold text-blue-600">{requestId}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button className="px-6 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={() => navigate("/my-orders")}>
            Check My Orders
          </button>
          <button className="px-6 py-3 text-lg border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

function renderLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
      <div className="max-w-xl space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Processing Your Payment...</h2>
        <p className="text-gray-600">We are confirming your payment details. This may take a few moments.</p>
        <p className="text-gray-600">Please do not close or refresh this window.</p>
        <div className="mt-8 w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
