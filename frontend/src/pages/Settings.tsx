import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Dialog from '@radix-ui/react-dialog';
import { User, Bell, CreditCard, Info, Settings as SettingsIcon, Save, Edit, Shield, Globe, Palette, Key, Moon, Sun, X, Eye, EyeOff } from 'lucide-react';
import clsx from 'clsx';
import { useToastStore } from '../store/toastStore';
import { useAuthStore } from '../store/authStore';

export default function Settings() {
  const showToast = useToastStore(state => state.showToast);
  const { user } = useAuthStore();

  // User settings state
  const [userSettings, setUserSettings] = useState({
    name: user?.full_name || 'John Doe',
    email: user?.email || 'john@example.com',
    marketingEmails: true,
    weeklyNewsletter: false,
    currentPlan: 'free',
    darkMode: false,
    language: 'en',
    timezone: 'UTC-5'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    showToast('Settings saved successfully!', 'success');
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const handlePasswordSubmit = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      showToast('Password does not meet security requirements', 'error');
      return;
    }
    
    if (currentPassword === newPassword) {
      showToast('New password must be different from current password', 'error');
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordDialog(false);
      showToast('Password changed successfully!', 'success');
    } catch (error) {
      showToast('Failed to change password. Please try again.', 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-accent-light/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="w-20 h-20 bg-gradient-to-br from-brand to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <SettingsIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage your account preferences and customize your Propvia experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Communication */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Settings */}
            <div className="glass-card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand/20 to-brand/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <User className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    <p className="text-gray-600">Update your personal details</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand/10 to-brand/20 text-brand rounded-xl hover:from-brand/20 hover:to-brand/30 transition-all duration-200 font-medium"
                >
                  <Edit className="w-4 h-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userSettings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={`input-field ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userSettings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={`input-field ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200/50">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 btn-brand hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Communication Preferences */}
            <div className="glass-card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Bell className="w-6 h-6 text-accent-dark" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Communication Preferences</h2>
                  <p className="text-gray-600">Choose how you want to hear from us</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-brand-50/30 rounded-xl border border-gray-200/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand/10 to-brand/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Marketing Updates</h3>
                      <p className="text-sm text-gray-600">Receive emails about new features and updates</p>
                    </div>
                  </div>
                  <Switch.Root
                    checked={userSettings.marketingEmails}
                    onCheckedChange={(checked) => handleInputChange('marketingEmails', checked)}
                    className={clsx(
                      'w-14 h-7 rounded-full transition-all duration-300 shadow-inner',
                      userSettings.marketingEmails 
                        ? 'bg-gradient-to-r from-brand to-brand-600 shadow-brand/30' 
                        : 'bg-gray-300 shadow-gray-300/30'
                    )}
                  >
                    <Switch.Thumb className={clsx(
                      'block w-5 h-5 bg-white rounded-full transition-transform shadow-lg',
                      'transform translate-x-1',
                      userSettings.marketingEmails && 'translate-x-8'
                    )} />
                  </Switch.Root>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50/50 to-accent-light/10 rounded-xl border border-gray-200/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-accent-dark" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Weekly Newsletter</h3>
                      <p className="text-sm text-gray-600">Get weekly insights and market updates</p>
                    </div>
                  </div>
                  <Switch.Root
                    checked={userSettings.weeklyNewsletter}
                    onCheckedChange={(checked) => handleInputChange('weeklyNewsletter', checked)}
                    className={clsx(
                      'w-14 h-7 rounded-full transition-all duration-300 shadow-inner',
                      userSettings.weeklyNewsletter 
                        ? 'bg-gradient-to-r from-accent to-accent-light shadow-accent/30' 
                        : 'bg-gray-300 shadow-gray-300/30'
                    )}
                  >
                    <Switch.Thumb className={clsx(
                      'block w-5 h-5 bg-white rounded-full transition-transform shadow-lg',
                      'transform translate-x-1',
                      userSettings.weeklyNewsletter && 'translate-x-8'
                    )} />
                  </Switch.Root>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Subscription & Preferences */}
          <div className="space-y-8">
            {/* Subscription Plan */}
            <div className="glass-card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Subscription Plan</h2>
                  <p className="text-gray-600 text-sm">Manage your subscription</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-green-800">Current Plan</span>
                  </div>
                  <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold">
                    ACTIVE
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-900 mb-1">Free Plan</p>
                <p className="text-green-700 text-sm mb-4">Perfect for getting started</p>
                
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Basic market insights
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Standard reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Email support
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-gradient-to-r from-accent/10 to-accent/20 rounded-xl border border-accent/20">
                <div className="text-center">
                  <Info className="w-5 h-5 text-accent-dark mx-auto mb-2" />
                  <p className="text-sm text-accent-dark font-medium">Additional plans coming soon!</p>
                  <p className="text-xs text-gray-600 mt-1">We're working on premium features</p>
                </div>
              </div>
            </div>

            {/* App Preferences */}
            <div className="glass-card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">App Preferences</h2>
                  <p className="text-gray-600 text-sm">Customize your experience</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      {userSettings.darkMode ? <Moon className="w-4 h-4 text-purple-600" /> : <Sun className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Dark Mode</h3>
                      <p className="text-xs text-gray-600">Toggle dark theme</p>
                    </div>
                  </div>
                  <Switch.Root
                    checked={userSettings.darkMode}
                    onCheckedChange={(checked) => handleInputChange('darkMode', checked)}
                    className={clsx(
                      'w-12 h-6 rounded-full transition-all duration-300',
                      userSettings.darkMode ? 'bg-purple-600' : 'bg-gray-300'
                    )}
                  >
                    <Switch.Thumb className={clsx(
                      'block w-4 h-4 bg-white rounded-full transition-transform shadow-sm',
                      'transform translate-x-1',
                      userSettings.darkMode && 'translate-x-7'
                    )} />
                  </Switch.Root>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={userSettings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="input-field"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={userSettings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="input-field"
                  >
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="glass-card hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Key className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Security</h2>
                  <p className="text-gray-600 text-sm">Manage account security</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setShowPasswordDialog(true)}
                  className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-red-50/50 rounded-xl border border-gray-200/50 hover:border-red-200 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-700 transition-colors">Change Password</h3>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <Key className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Dialog */}
      <Dialog.Root open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white/95 backdrop-blur-md p-8 shadow-2xl border border-gray-200 z-[201]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                  <Key className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Change Password
                  </Dialog.Title>
                  <Dialog.Description className="text-gray-600 text-sm">
                    Update your account password for better security
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    className="input-field pr-12"
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {passwordData.newPassword && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</h4>
                    <div className="space-y-1">
                      {(() => {
                        const validation = validatePassword(passwordData.newPassword);
                        return (
                          <>
                            <div className={`flex items-center gap-2 text-xs ${validation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${validation.minLength ? 'bg-green-500' : 'bg-gray-300'}`} />
                              At least 8 characters
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${validation.hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${validation.hasUpper ? 'bg-green-500' : 'bg-gray-300'}`} />
                              One uppercase letter
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${validation.hasLower ? 'text-green-600' : 'text-gray-500'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${validation.hasLower ? 'bg-green-500' : 'bg-gray-300'}`} />
                              One lowercase letter
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${validation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${validation.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`} />
                              One number
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${validation.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${validation.hasSpecial ? 'bg-green-500' : 'bg-gray-300'}`} />
                              One special character
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    className={`input-field pr-12 ${
                      passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : ''
                    }`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200/50">
              <button
                onClick={() => setShowPasswordDialog(false)}
                className="flex-1 px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-300 font-medium border border-gray-200 hover:border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                disabled={isChangingPassword || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword || passwordData.newPassword !== passwordData.confirmPassword}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2"
              >
                {isChangingPassword ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Changing...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}