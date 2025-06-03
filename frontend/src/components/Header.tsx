import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Settings, LogOut, User, FileText, Bell, Building2, Menu, Search } from 'lucide-react';
import { Notification } from '../types';
import { format } from 'date-fns';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface HeaderProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkNotificationAsRead: (id: string) => void;
  onOpenSavedScenarios: () => void;
  onDownloadFullReport: () => void;
}

export default function Header({ 
  notifications = [],
  onMarkNotificationAsRead,
  onOpenSavedScenarios,
  unreadCount = 0,
  onDownloadFullReport
}: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const showToast = useToastStore(state => state.showToast);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAskDialog, setShowAskDialog] = useState(false);
  const [askQuery, setAskQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleLogout = () => {
    logout();
    showToast('Successfully logged out', 'success');
    navigate('/platform');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    showToast('Settings page opened', 'info');
  };

  const handleNotificationClick = (id: string) => {
    onMarkNotificationAsRead(id);
    showToast('Notification marked as read', 'success');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleAsk = async () => {
    if (!askQuery.trim()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setResponse(`Based on your query "${askQuery}", here are our recommendations:

1. Detroit Midtown District
   - High foot traffic area with 15,000+ daily pedestrians
   - Recent development projects totaling $2.1B in investment
   - Walk score: 92, Transit score: 85
   - Demographics: 65% young professionals, median income $68,000
   - Upcoming events: Annual Arts Festival (50,000+ attendees)

2. Corktown Neighborhood
   - Historic district with growing food scene
   - 28% increase in business licenses issued last year
   - Major tech company moving in (1,000+ employees)
   - Demographics: Mixed residential/commercial, family-friendly
   - Development: $500M mixed-use project breaking ground

3. Eastern Market District
   - 45,000+ weekly visitors during market days
   - Food-centric business cluster
   - Recent infrastructure improvements
   - Strong community engagement
   - Business incentives available for food-related ventures

These locations align with current market trends and show strong potential for growth based on demographic shifts, development patterns, and economic indicators.`);
    } catch (error) {
      showToast('Error processing request', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-brand shadow-sm fixed top-0 left-0 right-0 z-[100]">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-brand" />
            </div>
            <h1 className="text-2xl font-bold text-white">Propvia</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-500 font-medium rounded-lg cursor-not-allowed opacity-80"
                      >
                        <Search className="w-5 h-5" />
                        <span>Ask AI (Coming Soon!)</span>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-white p-3 rounded-lg shadow-lg border max-w-xs"
                        sideOffset={5}
                      >
                        <p className="text-sm text-gray-600">
                          Coming Soon: Ask our AI about any property or neighborhood in Detroit! Get instant insights about market trends, business opportunities, and community impact.
                        </p>
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <button
                  onClick={onOpenSavedScenarios}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 text-white hover:bg-brand-600 rounded-lg transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  <span>Analysis Reports</span>
                </button>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="relative p-2 text-white hover:bg-brand-600 rounded-full transition-colors">
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 w-5 h-5 bg-accent rounded-full text-brand text-xs flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="w-80 bg-white rounded-lg shadow-lg mt-1 z-[200]"
                      sideOffset={5}
                      align="end"
                    >
                      <div className="p-3 border-b border-gray-100">
                        <h3 className="font-semibold">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            No notifications
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <DropdownMenu.Item
                              key={notification.id}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                              onClick={() => handleNotificationClick(notification.id)}
                            >
                              <div className="flex items-start space-x-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 mt-2 bg-brand rounded-full" />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {format(notification.date, 'MMM d, h:mm a')}
                                  </p>
                                </div>
                              </div>
                            </DropdownMenu.Item>
                          ))
                        )}
                      </div>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="focus:outline-none">
                      <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-brand-600 hover:bg-brand-700 transition-colors">
                        <Avatar.Image
                          className="h-full w-full object-cover"
                          src={user?.avatar}
                          alt={user?.name}
                        />
                        <Avatar.Fallback 
                          className="flex h-full w-full items-center justify-center bg-brand-600 text-sm font-medium uppercase text-white"
                          delayMs={600}
                        >
                          {getInitials(user?.name)}
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[220px] bg-white rounded-lg shadow-lg p-1 mt-1 z-[200]"
                      sideOffset={5}
                      align="end"
                    >
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      
                      <DropdownMenu.Item 
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => navigate('/user-dashboard')}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </DropdownMenu.Item>
                      
                      <DropdownMenu.Item 
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={handleSettingsClick}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </DropdownMenu.Item>
                      
                      <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                      
                      <DropdownMenu.Item 
                        className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-white hover:bg-brand-600 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/platform"
                className="btn-cta"
              >
                Explore Properties
              </Link>
            )}
          </div>
        </div>
      </div>

      <Dialog.Root open={showAskDialog} onOpenChange={setShowAskDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Ask About Business Opportunities
            </Dialog.Title>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What would you like to know?
                </label>
                <textarea
                  value={askQuery}
                  onChange={(e) => setAskQuery(e.target.value)}
                  placeholder="E.g., What are the best locations for a café in Detroit?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {response && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Analysis Results</h3>
                  <div className="whitespace-pre-wrap text-gray-600">
                    {response}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAskDialog(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={handleAsk}
                  disabled={isLoading || !askQuery.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? 'Analyzing...' : 'Get Insights'}
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}