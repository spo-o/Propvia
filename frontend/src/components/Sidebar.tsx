import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  Building2, 
  FileText, 
  Globe, 
  User, 
  Users, 
  Settings,
  Menu,
  X,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';

const publicNavigation = [
  { name: 'Property Explorer', icon: Building2, path: '/platform' },
];

const privateNavigation = [
  { name: 'Reports', icon: FileText, path: '/reports' },
  { name: 'Market Intel', icon: Globe, path: '/market' },
  { name: 'My Dashboard', icon: User, path: '/user-dashboard' },
  { name: 'Custom Requests', icon: Building, path: '/requests' },
  { name: 'Team', icon: Users, path: '/team' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Default to closed for full width view
  const { isAuthenticated } = useAuthStore();

  const navigation = isAuthenticated 
    ? [...publicNavigation, ...privateNavigation]
    : publicNavigation;

  useEffect(() => {
    const handleResize = () => {
      // Don't auto-open on resize, let user control sidebar
      if (window.innerWidth < 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      {/* Modern floating toggle button with proper positioning */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 left-6 z-50 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 group hover:scale-105"
        title={isOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        <div className="relative">
          {isOpen ? (
            <X className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
          ) : (
            <Menu className="w-4 h-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              className="fixed top-0 left-0 z-40 h-screen bg-white/98 backdrop-blur-xl border-r border-gray-200/60 shadow-2xl overflow-y-auto pt-20 w-72"
            >
              <div className="w-72 p-4">
                <div className="mb-4">
                  <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Navigation
                  </h2>
                </div>
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-brand/10 to-brand/5 text-brand border border-brand/20 shadow-sm'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 hover:text-gray-900 border border-transparent hover:border-gray-200/50'
                        }`
                      }
                      onClick={() => setIsOpen(false)} // Always close on navigation for cleaner UX
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`flex items-center justify-center w-7 h-7 rounded-lg mr-2.5 transition-all duration-200 ${
                            isActive ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-500 group-hover:bg-brand/10 group-hover:text-brand'
                          }`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-brand rounded-full"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
                
                {isAuthenticated && (
                  <div className="mt-6 pt-4 border-t border-gray-200/50">
                    <div className="p-3 bg-gradient-to-br from-brand/5 to-accent/5 rounded-xl border border-brand/10">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 bg-gradient-to-br from-brand to-brand-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Propvia Platform</p>
                          <p className="text-xs text-gray-500">Professional Edition</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Backdrop overlay - always show when sidebar is open */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}