import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { User, Bell, CreditCard, Info } from 'lucide-react';
import clsx from 'clsx';
import { useToastStore } from '../store/toastStore';

export default function Settings() {
  const showToast = useToastStore(state => state.showToast);

  // User settings state
  const [userSettings, setUserSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    marketingEmails: true,
    weeklyNewsletter: false,
    currentPlan: 'free'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Information
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={userSettings.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={userSettings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Communication Preferences
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Marketing Updates</h3>
              <p className="text-sm text-gray-500">Receive emails about new features and updates</p>
            </div>
            <Switch.Root
              checked={userSettings.marketingEmails}
              onCheckedChange={(checked) => handleInputChange('marketingEmails', checked)}
              className={clsx(
                'w-11 h-6 rounded-full transition-colors',
                userSettings.marketingEmails ? 'bg-blue-600' : 'bg-gray-200'
              )}
            >
              <Switch.Thumb className={clsx(
                'block w-4 h-4 bg-white rounded-full transition-transform',
                'transform translate-x-1',
                userSettings.marketingEmails && 'translate-x-6'
              )} />
            </Switch.Root>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Weekly Newsletter</h3>
              <p className="text-sm text-gray-500">Get weekly insights and market updates</p>
            </div>
            <Switch.Root
              checked={userSettings.weeklyNewsletter}
              onCheckedChange={(checked) => handleInputChange('weeklyNewsletter', checked)}
              className={clsx(
                'w-11 h-6 rounded-full transition-colors',
                userSettings.weeklyNewsletter ? 'bg-blue-600' : 'bg-gray-200'
              )}
            >
              <Switch.Thumb className={clsx(
                'block w-4 h-4 bg-white rounded-full transition-transform',
                'transform translate-x-1',
                userSettings.weeklyNewsletter && 'translate-x-6'
              )} />
            </Switch.Root>
          </div>
        </div>
      </div>

      {/* Subscription Plan */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Subscription Plan
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Current Plan:</p>
            <p className="text-lg font-semibold">Free Plan</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• Basic market insights</li>
              <li>• Standard reporting</li>
              <li>• Email support</li>
            </ul>
          </div>
          <div className="text-sm text-gray-500">
            <Info className="w-4 h-4 inline mr-1" />
            Additional plans coming soon!
          </div>
        </div>
      </div>
    </div>
  );
}