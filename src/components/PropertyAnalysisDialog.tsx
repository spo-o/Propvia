import * as Dialog from '@radix-ui/react-dialog';
import { Property, SavedScenario } from '../types';
import { X, Building2, Users, DollarSign, TrendingUp, Download, Save, FileText, ChevronRight, Calendar, Ruler, Home, Shield } from 'lucide-react';
import { useState } from 'react';
import { useToastStore } from '../store/toastStore';

interface PropertyAnalysisDialogProps {
  property: Property | null;
  onClose: () => void;
  onSave: (scenario: SavedScenario) => void;
}

type Tab = 'recommendations' | 'financials' | 'details';

export default function PropertyAnalysisDialog({ 
  property, 
  onClose,
  onSave
}: PropertyAnalysisDialogProps) {
  const [selectedBusiness, setSelectedBusiness] = useState<'daycare' | 'cafe' | 'coworking'>('cafe');
  const [activeTab, setActiveTab] = useState<Tab>('recommendations');
  const showToast = useToastStore(state => state.showToast);

  if (!property) return null;

  const analysis = property.analysis[selectedBusiness];

  const handleSave = () => {
    const scenario: SavedScenario = {
      id: Date.now().toString(),
      name: `${selectedBusiness.charAt(0).toUpperCase() + selectedBusiness.slice(1)} - ${property.address}`,
      property,
      analysis: {
        id: Date.now().toString(),
        propertyId: property.id,
        businessType: selectedBusiness,
        marketingBudget: 5000,
        monthlyRent: analysis.monthlyProfit,
        profitTimeline: Array.from({ length: 24 }, (_, i) => ({
          month: i + 1,
          profit: analysis.monthlyProfit * (1 + i * 0.1)
        })),
        confidence: analysis.confidence
      },
      dateCreated: new Date(),
      lastModified: new Date(),
      notes: ''
    };

    onSave(scenario);
    showToast('Analysis saved successfully!', 'success');
    onClose();
  };

  const handleGenerateReport = () => {
    showToast('Generating detailed report...', 'info');
    setTimeout(() => {
      showToast('Report generated successfully!', 'success');
    }, 1500);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'recommendations':
        return (
          <>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => setSelectedBusiness('daycare')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedBusiness === 'daycare' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Daycare Center</h3>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    analysis.confidence >= 80 
                      ? 'bg-green-100 text-green-800'
                      : analysis.confidence >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.analysis.daycare.confidence}% Match
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Early childhood education facility
                </p>
              </button>

              <button
                onClick={() => setSelectedBusiness('cafe')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedBusiness === 'cafe' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Café</h3>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    property.analysis.cafe.confidence >= 80 
                      ? 'bg-green-100 text-green-800'
                      : property.analysis.cafe.confidence >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.analysis.cafe.confidence}% Match
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Coffee shop and light dining
                </p>
              </button>

              <button
                onClick={() => setSelectedBusiness('coworking')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedBusiness === 'coworking' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Coworking Space</h3>
                  <div className={`px-2 py-1 rounded-full text-sm ${
                    property.analysis.coworking.confidence >= 80 
                      ? 'bg-green-100 text-green-800'
                      : property.analysis.coworking.confidence >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.analysis.coworking.confidence}% Match
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Flexible workspace solution
                </p>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Business Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                        <span>Startup Cost</span>
                      </div>
                      <span className="font-semibold">
                        ${analysis.startupCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                        <span>Monthly Profit</span>
                      </div>
                      <span className="font-semibold">
                        ${analysis.monthlyProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-purple-500 mr-2" />
                        <span>Market Share</span>
                      </div>
                      <span className="font-semibold">
                        {analysis.competitorAnalysis.marketShare}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Key Factors</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      {analysis.rationale.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Competition Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Direct Competitors</span>
                        <span className="font-semibold">{analysis.competitorAnalysis.direct}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(analysis.competitorAnalysis.direct / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Indirect Competitors</span>
                        <span className="font-semibold">{analysis.competitorAnalysis.indirect}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(analysis.competitorAnalysis.indirect / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Growth Projections</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Year 1</span>
                        <span className="font-semibold">{analysis.projectedGrowth.year1}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${analysis.projectedGrowth.year1}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Year 3</span>
                        <span className="font-semibold">{analysis.projectedGrowth.year3}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${analysis.projectedGrowth.year3}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Year 5</span>
                        <span className="font-semibold">{analysis.projectedGrowth.year5}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${analysis.projectedGrowth.year5}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Risk Analysis</h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${
                      analysis.riskAnalysis.level === 'Low'
                        ? 'bg-green-100 text-green-800'
                        : analysis.riskAnalysis.level === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className="font-semibold mb-2">
                        {analysis.riskAnalysis.level} Risk
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {analysis.riskAnalysis.factors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      
      case 'financials':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">5-Year Financial Forecast</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Revenue Projections</h4>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((year) => (
                      <div key={year}>
                        <div className="flex justify-between mb-1">
                          <span>Year {year}</span>
                          <span className="font-semibold">
                            ${(analysis.monthlyProfit * 12 * (1 + year * 0.1)).toLocaleString()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${Math.min(100, year * 20)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Operating Expenses</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">Rent</div>
                      <div className="text-lg font-semibold">${(property.renovationCost * 0.008).toLocaleString()}/mo</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">Utilities</div>
                      <div className="text-lg font-semibold">${(property.sqft * 1.5).toLocaleString()}/mo</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">Insurance</div>
                      <div className="text-lg font-semibold">${(property.renovationCost * 0.002).toLocaleString()}/mo</div>
                    </div>
                    <div className="p-4 bg-white rounded-lg">
                      <div className="text-sm text-gray-600">Maintenance</div>
                      <div className="text-lg font-semibold">${(property.sqft * 0.75).toLocaleString()}/mo</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Break-Even Analysis</h4>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Break-Even Point</div>
                        <div className="text-lg font-semibold">{analysis.breakeven} months</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Initial Investment</div>
                        <div className="text-lg font-semibold">${analysis.startupCost.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(analysis.breakeven / 36) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      Expected to break even in {analysis.breakeven} months at current projections
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Building Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Building2 className="w-5 h-5 text-gray-500 mr-2" />
                        <span>Square Footage</span>
                      </div>
                      <span className="font-semibold">{property.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                        <span>Year Built</span>
                      </div>
                      <span className="font-semibold">{property.yearBuilt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Ruler className="w-5 h-5 text-gray-500 mr-2" />
                        <span>Lot Size</span>
                      </div>
                      <span className="font-semibold">{property.lotSize.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Home className="w-5 h-5 text-gray-500 mr-2" />
                        <span>Zoning</span>
                      </div>
                      <span className="font-semibold">{property.zoning}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Location Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Walk Score</span>
                        <span className="font-semibold">{property.walkScore}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${property.walkScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Transit Score</span>
                        <span className="font-semibold">{property.transitScore}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${property.transitScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Bike Score</span>
                        <span className="font-semibold">{property.bikeScore}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${property.bikeScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Building Overview</h4>
                <p className="text-gray-600 mb-4">{property.buildingOverview.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Highlights</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      {property.buildingOverview.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Amenities</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      {property.buildingOverview.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog.Root open={!!property} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[95vw] md:w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4 md:p-6 shadow-xl overflow-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-xl md:text-2xl font-bold text-gray-900">
                Property Analysis
              </Dialog.Title>
              <Dialog.Description className="text-gray-600">
                {property?.address}
              </Dialog.Description>
            </div>
            <Dialog.Close className="p-2 text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'recommendations'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Recommendations
            </button>
            <button
              onClick={() => setActiveTab('financials')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'financials'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Financial Forecast
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'details'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Property Details
            </button>
          </div>

          {renderTab()}

          <div className="flex flex-col sm:flex-row justify-end mt-8 gap-4">
            <button
              onClick={handleGenerateReport}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Report
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Analysis
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}