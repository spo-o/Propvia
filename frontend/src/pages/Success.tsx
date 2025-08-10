import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const location = useLocation();
  const paymentConfirmed = location.state?.paymentConfirmed;

  //in case the user navigates to this page without a confirmed payment
  useEffect(() => {
    if (!paymentConfirmed) {
      navigate("/", { replace: true });
    }
  }, [paymentConfirmed, navigate]);

  if (!paymentConfirmed) {
    // You can render a simple loading screen or null while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="max-w-xl text-center space-y-6 border border-gray-200 p-8 rounded-2xl shadow-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600">
          Your payment was successful and we've received your custom report
          request.
          <br />
          We’ll review your submission and email your personalized report
          shortly.
        </p>
        {requestId && (
          <p className="text-gray-700 font-medium">
            Your Request ID:{" "}
            <span className="font-bold text-blue-600">{requestId}</span>
          </p>
        )}
        <div className="space-y-4">
          <a
            href="https://calendly.com/hello-propvia/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-md">
              Book Your Consultation
            </button>
          </a>

          <button
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-md mt-2"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
