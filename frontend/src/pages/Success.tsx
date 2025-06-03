import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

export default function Success() {
  const navigate = useNavigate();
  const showToast = useToastStore(state => state.showToast);

  useEffect(() => {
    showToast('Payment successful! Your analysis will begin shortly.', 'success');
    const timer = setTimeout(() => {
      navigate('/platform');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate, showToast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Our team will begin analyzing your property right away.
            You'll receive an email confirmation shortly.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you back to the platform...
          </p>
        </div>
      </div>
    </div>
  );
}