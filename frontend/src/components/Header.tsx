import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Settings, LogOut, User, FileText, Bell, Building2, Menu, Search, Brain } from 'lucide-react';
import { Notification } from '../types';
import { format } from 'date-fns';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { askAI } from '../api/ai';


interface HeaderProps { // Backend Logic Found: Notifications data coming from backend
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
  const { isAuthenticated, user, token, logout } = useAuthStore();
  const navigate = useNavigate();
  const showToast = useToastStore(state => state.showToast);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAskDialog, setShowAskDialog] = useState(false);
  const [askQuery, setAskQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleLogout = () => {  // Backend Logic Found: Logout process (token/session clearing on backend)
    logout();
    showToast('Successfully logged out', 'success');
    navigate('/platform');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    showToast('Settings page opened', 'info');
  };

  const handleNotificationClick = (id: string) => {
    onMarkNotificationAsRead(id); // Backend Logic Found: Update notification read status in backend
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
    const data = await askAI(askQuery, token!);
    setResponse(data.response);
  } catch (error) {
    showToast('Failed to get AI response', 'error');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <header className="bg-gradient-to-r from-brand via-brand-600 to-brand-700 shadow-xl backdrop-blur-md fixed top-0 left-0 right-0 z-[100] border-b border-brand-500/20">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center space-x-3 transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
              <Building2 className="w-6 h-6 text-brand" />
            </div>
            <h1 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">Propvia</h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button
                        className="hidden md:flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-brand-400/30 to-brand-500/30 backdrop-blur-sm text-white/80 font-medium rounded-xl border border-white/20 cursor-not-allowed opacity-80 hover:opacity-90 transition-all duration-300"
                      >
                        <Search className="w-5 h-5" />
                        <span>Ask AI (Coming Soon!)</span>
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="bg-white p-4 rounded-xl shadow-2xl border border-gray-200 max-w-xs backdrop-blur-sm"
                        sideOffset={5}
                      >
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Coming Soon: Ask our AI about any property or neighborhood in Detroit! Get instant insights about market trends, business opportunities, and community impact.
                        </p>
                        <Tooltip.Arrow className="fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>

                <button
                  onClick={onOpenSavedScenarios}
                  className="hidden md:flex items-center space-x-2 px-5 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 backdrop-blur-sm"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Analysis Reports</span>
                </button>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="relative p-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 backdrop-blur-sm group">
                      <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-accent to-accent-light rounded-full text-brand text-xs font-bold flex items-center justify-center shadow-lg animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl mt-1 z-[200] border border-gray-200"
                      sideOffset={5}
                      align="end"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-bold text-lg text-brand">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-gray-500">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="font-medium">No notifications</p>
                            <p className="text-sm">You're all caught up!</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <DropdownMenu.Item
                              key={notification.id}
                              className="p-4 hover:bg-gray-50/80 cursor-pointer border-b border-gray-100 last:border-0 transition-all duration-200"
                              onClick={() => handleNotificationClick(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                {!notification.read && (
                                  <div className="w-2 h-2 mt-2 bg-gradient-to-r from-brand to-brand-600 rounded-full animate-pulse" />
                                )}
                                <div className="flex-1">
                                  <p className="font-semibold text-sm text-brand">{notification.title}</p>
                                  <p className="text-sm text-gray-600 leading-relaxed">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-2 font-medium">
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
                      <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 hover:from-brand-400 hover:to-brand-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        <Avatar.Fallback 
                          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-600 to-brand-700 text-sm font-bold uppercase text-white"
                          delayMs={600}
                        >
                          {getInitials(user?.full_name)}
                        </Avatar.Fallback>
                      </Avatar.Root>
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      className="min-w-[250px] bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-1 mt-1 z-[200] border border-gray-200"
                      sideOffset={5}
                      align="end"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-brand/5 to-brand-600/5 rounded-t-lg">
                        <p className="text-sm font-bold text-brand">{user?.full_name || 'User'}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      
                      <DropdownMenu.Item 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-brand/5 hover:to-brand-600/5 rounded-lg cursor-pointer transition-all duration-200 mx-1"
                        onClick={() => navigate('/user-dashboard')}
                      >
                        <User className="w-4 h-4 mr-3 text-brand" />
                        <span className="font-medium">Profile</span>
                      </DropdownMenu.Item>
                      
                      <DropdownMenu.Item 
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-brand/5 hover:to-brand-600/5 rounded-lg cursor-pointer transition-all duration-200 mx-1"
                        onClick={handleSettingsClick}
                      >
                        <Settings className="w-4 h-4 mr-3 text-brand" />
                        <span className="font-medium">Settings</span>
                      </DropdownMenu.Item>
                      
                      <DropdownMenu.Separator className="h-px bg-gray-200 my-2 mx-2" />
                      
                      <DropdownMenu.Item 
                        className="flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-all duration-200 mx-1"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        <span className="font-medium">Sign out</span>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>

                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </>
            )}

            {!isAuthenticated && (
              <Link
                to="/platform"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-accent-light text-brand-900 font-bold rounded-xl hover:from-accent-light hover:to-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Properties
              </Link>
            )}
          </div>
        </div>
      </div>

      <Dialog.Root open={showAskDialog} onOpenChange={setShowAskDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white/95 backdrop-blur-md p-8 shadow-2xl border border-gray-200">
            <Dialog.Title className="text-2xl font-bold mb-6 text-brand bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">
              Ask About Business Opportunities
            </Dialog.Title>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-brand mb-2">
                  What would you like to know?
                </label>
                <textarea
                  value={askQuery}
                  onChange={(e) => setAskQuery(e.target.value)}
                  placeholder="E.g., What are the best locations for a café in Detroit?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-300 resize-none"
                  rows={3}
                />
              </div>

              {response && (
                <div className="bg-gradient-to-r from-brand/5 to-brand-600/5 p-6 rounded-xl border border-brand/20">
                  <h3 className="font-bold mb-3 text-brand flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Analysis Results
                  </h3>
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {response}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowAskDialog(false)}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={handleAsk}
                  disabled={isLoading || !askQuery.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-brand to-brand-600 text-white rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
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