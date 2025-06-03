import * as ToastPrimitive from '@radix-ui/react-toast';
import { useToastStore } from '../store/toastStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Toast() {
  const { message, type, isVisible, hideToast } = useToastStore();

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <ToastPrimitive.Provider>
      <AnimatePresence>
        {isVisible && (
          <ToastPrimitive.Root
            asChild
            open={isVisible}
            onOpenChange={hideToast}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`${colors[type]} text-white p-4 rounded-lg shadow-lg fixed bottom-4 right-4 z-50 flex items-center min-w-[300px]`}
            >
              <Icon className="w-5 h-5 mr-2" />
              <p className="flex-1">{message}</p>
              <button onClick={hideToast} className="ml-4">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </ToastPrimitive.Root>
        )}
      </AnimatePresence>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}