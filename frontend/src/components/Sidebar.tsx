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
  X
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
        className="fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 lg:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 z-40 h-screen bg-white border-r shadow-lg overflow-y-auto pt-16 lg:pt-20 lg:relative lg:shadow-none"
            >
              <div className="w-64 p-4">
                <nav className="space-y-1">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                          isActive
                            ? 'bg-brand-50 text-brand'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                      onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </motion.div>

            {window.innerWidth < 1024 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setIsOpen(false)}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}