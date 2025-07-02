import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Notification, SavedScenario } from './types';
import ProtectedRoute from './components/ProtectedRoute';
import Toast from './components/Toast';
import Footer from './components/Footer';

import Home from './pages/Home';
import PropertyExplorer from './pages/PropertyExplorer';
import PropertyDetail from './pages/PropertyDetail';
import ReportsCenter from './pages/ReportsCenter';
// import MarketIntelligence from './pages/MarketIntelligence';
import UserDashboard from './pages/UserDashboard';
import TeamCollaboration from './pages/TeamCollaboration';
import Settings from './pages/Settings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import SavedScenariosDialog from './components/SavedScenariosDialog';
// import AdminPortal from './pages/AdminPortal';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Security from './pages/Security';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Guides from './pages/Guides';
import GuidePage from './pages/GuidePage';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import SuccessPage from './pages/Success';



import { useAuthStore } from './store/authStore';
import ScrollToTop from './components/ScrollToTop';
import RequestsList from './pages/RequestsList';

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [showSavedScenarios, setShowSavedScenarios] = useState(false);
  const location = useLocation();

  // Don't show footer on platform pages
  const hideFooter = ['/platform'].includes(location.pathname);

  const handleOpenSavedScenarios = () => {
    setShowSavedScenarios(true);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleSaveScenario = (scenario: SavedScenario) => {
    setSavedScenarios(prev => [...prev, scenario]);
    setNotifications(prev => [
      {
        id: Date.now().toString(),
        title: 'Analysis Saved',
        message: `Analysis for ${scenario.property.address} has been saved.`,
        read: false,
        date: new Date()
      },
      ...prev
    ]);
    setUnreadCount(prev => prev + 1);
  };

  const handleDeleteScenario = (scenarioId: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== scenarioId));
    setNotifications(prev => [
      {
        id: Date.now().toString(),
        title: 'Analysis Deleted',
        message: 'The selected analysis has been deleted.',
        read: false,
        date: new Date()
      },
      ...prev
    ]);
    setUnreadCount(prev => prev + 1);
  };

  const handleExportPDF = (scenario: SavedScenario) => {
    console.log('Exporting PDF for scenario:', scenario.id);
  };

  const renderWithLayout = (component: React.ReactNode, showSidebar = true) => (
    <div className="flex-1 flex">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 flex flex-col min-h-0 ${showSidebar ? 'lg:ml-10' : ''}`}>
        <div className="flex-1 pt-16">
          {component}
        </div>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onOpenSavedScenarios={handleOpenSavedScenarios}
        onDownloadFullReport={() => {}}
      />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/platform" 
          element={
            <div className="flex flex-col">
              {renderWithLayout(<PropertyExplorer onSaveScenario={handleSaveScenario} />)}
            </div>
          }
        />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/platform" replace /> : <Login />
        } />
        <Route path="/property/:id" element={renderWithLayout(<PropertyDetail />)} />
        <Route path="/about" element={renderWithLayout(<About />, false)} />
        <Route path="/privacy" element={renderWithLayout(<Privacy />, false)} />
        <Route path="/terms" element={renderWithLayout(<Terms />, false)} />
        <Route path="/security" element={renderWithLayout(<Security />, false)} />
        <Route path="/faq" element={renderWithLayout(<FAQ />, false)} />
        <Route path="/blog" element={renderWithLayout(<Blog />, false)} />
        <Route path="/blog/:id" element={renderWithLayout(<BlogPost />, false)} />
        <Route path="/guides" element={renderWithLayout(<Guides />, false)} />
        <Route path="/guides/:id" element={renderWithLayout(<GuidePage />, false)} />
        <Route path="/contact" element={renderWithLayout(<Contact />, false)} />
        <Route path="/careers" element={renderWithLayout(<Careers />, false)} />
        <Route path="/success" element={<SuccessPage />} />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            {renderWithLayout(<ReportsCenter savedScenarios={savedScenarios} />)}
          </ProtectedRoute>
        } />
        {/* <Route path="/market" element={
          <ProtectedRoute>
            {renderWithLayout(<MarketIntelligence />)}
          </ProtectedRoute>
        } /> */}
        <Route path="/user-dashboard" element={
          <ProtectedRoute>
            {renderWithLayout(<UserDashboard savedScenarios={savedScenarios} />)}
          </ProtectedRoute>
        } />
        <Route path="/requests" element={
          <ProtectedRoute>
            {renderWithLayout(<RequestsList savedScenarios={savedScenarios} />)}
          </ProtectedRoute>
        } />
        <Route path="/team" element={
          <ProtectedRoute>
            {renderWithLayout(<TeamCollaboration />)}
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            {renderWithLayout(<Settings />)}
          </ProtectedRoute>
        } />
        {/* <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            {renderWithLayout(<AdminPortal />)}
          </ProtectedRoute>
        } /> */}
      </Routes>

      <SavedScenariosDialog
        open={showSavedScenarios}
        onOpenChange={setShowSavedScenarios}
        scenarios={savedScenarios}
        onExportPDF={handleExportPDF}
        onDelete={handleDeleteScenario}
      />

      <Toast />
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}