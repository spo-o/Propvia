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
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
  const { isAuthenticated } = useAuthStore();

  const navigation = isAuthenticated 
    ? [...publicNavigation, ...privateNavigation]
    : publicNavigation;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 lg:hidden border border-gray-200/50"
      >
        {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 z-40 h-screen bg-white/95 backdrop-blur-md border-r border-gray-200/50 shadow-2xl overflow-y-auto pt-16 lg:pt-20 lg:relative lg:shadow-none lg:bg-white lg:backdrop-blur-none"
            >
              <div className="w-72 p-6">
                <div className="mb-6">
                  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Navigation
                  </h2>
                </div>
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-brand/10 to-brand/5 text-brand border border-brand/20 shadow-sm'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 hover:text-gray-900 border border-transparent hover:border-gray-200/50'
                        }`
                      }
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200 ${
                            isActive ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-500 group-hover:bg-brand/10 group-hover:text-brand'
                          }`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-brand rounded-full"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
                
                {isAuthenticated && (
                  <div className="mt-8 pt-6 border-t border-gray-200/50">
                    <div className="p-4 bg-gradient-to-br from-brand/5 to-accent/5 rounded-xl border border-brand/10">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white" />
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

            {window.innerWidth < 1024 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
                onClick={() => setIsOpen(false)}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}