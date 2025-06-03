import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronRight, Building2, DollarSign, FileText, Brain, Users, Shield } from 'lucide-react';
import { useState } from 'react';
import { useToastStore } from '../store/toastStore';
import { useNavigate } from 'react-router-dom';

interface CustomPropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomPropertyForm({ open, onOpenChange }: CustomPropertyFormProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Entity Information
    entityType: '',
    companyName: '',
    experienceLevel: '',
    // Property Information
    address: '',
    sqft: '',
    yearBuilt: '',
    currentUse: '',
    // Project Details
    ownershipStatus: '',
    intendedUse: '',
    timeline: '',
    helpLevel: '',
    // Additional Details
    description: ''
  });

  const [selectedPackage, setSelectedPackage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const showToast = useToastStore(state => state.showToast);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone',
      'entityType', 'experienceLevel',
      'address', 'sqft', 'yearBuilt', 'currentUse',
      'ownershipStatus', 'intendedUse', 'timeline', 'helpLevel'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        showToast(`Please fill out ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
        return;
      }
    }

    if (!selectedPackage) {
      showToast('Please select a package', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      // Store form data in localStorage for reference during the meeting
      localStorage.setItem('propertyAnalysisRequest', JSON.stringify({
        ...formData,
        selectedPackage,
        submittedAt: new Date().toISOString()
      }));

      // Redirect to Calendly
      window.location.href = 'https://calendly.com/hello-propvia/30min';
    } catch (error) {
      console.error('Error processing request:', error);
      showToast('Error processing your request', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const packages = {
    COMMUNITY_CATALYST: {
      name: 'Community Catalyst',
      description: 'Jumpstart your Detroit investment with AI-powered insights.',
      price: 750,
      features: [
        'AI Opportunity Score (0-100)',
        '5-Year Financial Forecasts',
        'Community Impact Report',
        'Jobs Created Analysis',
        '1-Hour Strategy Call',
        '30-Day Email Support'
      ]
    },
    URBAN_INNOVATOR: {
      name: 'Urban Innovator',
      description: 'Scale your impact with advanced tools and custom scenarios.',
      price: 1200,
      features: [
        'Everything in Community Catalyst +',
        'Custom Build-Out Scenarios',
        'Pro Forma Financial Models',
        'Detroit Permit/Zoning Checklist',
        '3 Tailored Funding Sources',
        '60-Day Slack Support'
      ]
    },
    NEIGHBORHOOD_VISIONARY: {
      name: 'Neighborhood Visionary',
      description: 'Lead large-scale revitalization with comprehensive support.',
      price: 1500,
      features: [
        'Everything in Urban Innovator +',
        'Priority Site Visits (Detroit)',
        '5 Funding Sources',
        'Risk Mitigation Playbook',
        '90-Day VIP Support',
        'Priority Analysis (3 Days)'
      ]
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl overflow-auto">
          <div className="text-center mb-8">
            <Dialog.Title className="text-3xl font-bold text-brand mb-2">🚀 Transform Detroit Properties</Dialog.Title>
            <Dialog.Description className="text-xl text-gray-600">Get AI-powered insights and actionable recommendations</Dialog.Description>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'firstName', label: 'First Name', type: 'text' },
                  { name: 'lastName', label: 'Last Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phone', label: 'Phone', type: 'tel' }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Entity Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Entity Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Entity
                  </label>
                  <select
                    value={formData.entityType}
                    onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select entity type</option>
                    <option value="individual">Individual</option>
                    <option value="llc">LLC</option>
                    <option value="corporation">Corporation</option>
                    <option value="partnership">Partnership</option>
                    <option value="nonprofit">Non-Profit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name (if applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select experience level</option>
                    <option value="first_time">First-time investor</option>
                    <option value="some_experience">1-3 properties</option>
                    <option value="experienced">4+ properties</option>
                    <option value="professional">Professional developer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Property Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'address', label: 'Property Address', type: 'text' },
                  { name: 'sqft', label: 'Square Footage', type: 'number' },
                  { name: 'yearBuilt', label: 'Year Built', type: 'number' },
                  { name: 'currentUse', label: 'Current Use', type: 'text' }
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ownership Status
                  </label>
                  <select
                    value={formData.ownershipStatus}
                    onChange={(e) => setFormData({ ...formData, ownershipStatus: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select status</option>
                    <option value="owned">Currently Own</option>
                    <option value="under_contract">Under Contract</option>
                    <option value="negotiating">Negotiating</option>
                    <option value="exploring">Exploring Options</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intended Use
                  </label>
                  <select
                    value={formData.intendedUse}
                    onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select use</option>
                    <option value="retail">Retail</option>
                    <option value="restaurant">Restaurant/Café</option>
                    <option value="office">Office Space</option>
                    <option value="mixed">Mixed Use</option>
                    <option value="community">Community Space</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="immediate">Ready to start</option>
                    <option value="3_months">Within 3 months</option>
                    <option value="6_months">Within 6 months</option>
                    <option value="12_months">Within 12 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level of Help Needed
                  </label>
                  <select
                    value={formData.helpLevel}
                    onChange={(e) => setFormData({ ...formData, helpLevel: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Select level</option>
                    <option value="analysis">Analysis Only</option>
                    <option value="guidance">Analysis + Guidance</option>
                    <option value="full">Full Support</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Please provide any additional information about your project..."
              />
            </div>

            {/* Package Selection */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Select Your Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(packages).map(([key, pkg]) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPackage === key ? 'border-brand bg-brand/5 ring-2 ring-brand' : 'hover:border-brand/50'
                    }`}
                    onClick={() => setSelectedPackage(key)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <span className="text-lg font-bold">${pkg.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Shield className="w-4 h-4 text-brand mt-1 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing || !selectedPackage}
                className="px-6 py-2 bg-brand text-white rounded-md hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isProcessing ? 'Processing...' : 'Schedule Consultation'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>

          <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}