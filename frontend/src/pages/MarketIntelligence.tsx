import { useState, useEffect } from 'react';
import { 
  Building2, DollarSign, Users, Calendar, Shield, TrendingUp, TrendingDown, AlertCircle, Info, ChevronDown,
  Search, Filter, X, Download, Share2
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

const marketData = {
  propertyValue: {
    current: 85000,
    change: 8.1,
    trend: 'up',
    vsNational: 450000
  },
  salesVolume: {
    current: 15200,
    change: 3.2,
    trend: 'up'
  },
  daysOnMarket: {
    current: 61,
    change: 5,
    trend: 'down'
  },
  listSellRatio: {
    current: 95.6,
    change: 1.1,
    trend: 'up'
  }
};

const cityComparison = [
  {
    city: 'Detroit',
    propertyValue: 85000,
    growth: 8.1,
    occupancy: 85,
    roi: 12.4,
    insight: 'High ROI due to low entry costs + revitalization'
  },
  {
    city: 'Chicago',
    propertyValue: 330000,
    growth: 3.2,
    occupancy: 92,
    roi: 7.9,
    insight: 'Stable demand in downtown/core neighborhoods'
  },
  {
    city: 'NYC',
    propertyValue: 780000,
    growth: 1.8,
    occupancy: 94,
    roi: 5.5,
    insight: 'Slower growth but high occupancy in prime areas'
  }
];

const timelineData = {
  '1m': {
    value: 85000,
    change: 0.7,
    volume: 1520,
    volumeChange: 3.2,
    dom: 61,
    domChange: -5,
    ratio: 95.6,
    ratioChange: 1.1
  },
  '3m': {
    value: 83500,
    change: 2.1,
    volume: 4200,
    volumeChange: 8.5,
    dom: 65,
    domChange: -8,
    ratio: 94.8,
    ratioChange: 2.3
  },
  '6m': {
    value: 79000,
    change: 4.3,
    volume: 8100,
    volumeChange: 12.0,
    dom: 70,
    domChange: -10,
    ratio: 93.5,
    ratioChange: 3.5
  },
  '1y': {
    value: 78000,
    change: 8.1,
    volume: 15200,
    volumeChange: 18.0,
    dom: 75,
    domChange: -14,
    ratio: 92.0,
    ratioChange: 4.0
  }
};

const demographicData = {
  population: 632464,
  medianAge: 34.9,
  medianIncome: 36140,
  vacancyRate: 18,
  renterHouseholds: 54
};

export default function MarketIntelligence() {
  const { user } = useAuthStore();
  const [showTrendsDialog, setShowTrendsDialog] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('propertyValue');
  const [timeRange, setTimeRange] = useState('6m');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-brand border-brand/30 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="text-gray-600 mt-1">Comprehensive market analysis and trends</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowTrendsDialog(true)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span>View Trends</span>
          </button>
          <button
            onClick={() => setShowCompareDialog(true)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span>Compare Markets</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <select 
            className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="detroit"
          >
            <option value="detroit">Detroit, MI</option>
            <option value="chicago" disabled>Chicago, IL (Coming Soon)</option>
            <option value="nyc" disabled>New York City, NY (Coming Soon)</option>
            <option value="sf" disabled>San Francisco, CA (Coming Soon)</option>
            <option value="miami" disabled>Miami, FL (Coming Soon)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <div className="text-sm text-gray-500 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Last updated: Today, 9:41 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Building2 className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Median Property Value</span>
            </div>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Info className="w-4 h-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-white p-2 rounded shadow-lg border text-sm">
                    Based on Zillow Home Value Index
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">${marketData.propertyValue.current.toLocaleString()}</p>
            <div className={`flex items-center ${marketData.propertyValue.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {marketData.propertyValue.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span>{marketData.propertyValue.change}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">vs. National: ${marketData.propertyValue.vsNational.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Sales Volume</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{marketData.salesVolume.current.toLocaleString()}</p>
            <div className={`flex items-center ${marketData.salesVolume.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {marketData.salesVolume.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span>+{marketData.salesVolume.change}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Monthly transactions</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Days on Market</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{marketData.daysOnMarket.current}</p>
            <div className={`flex items-center ${marketData.daysOnMarket.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
              {marketData.daysOnMarket.trend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
              <span>{marketData.daysOnMarket.change} days</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Average time to sell</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">List/Sell Ratio</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{marketData.listSellRatio.current}%</p>
            <div className={`flex items-center ${marketData.listSellRatio.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {marketData.listSellRatio.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
              <span>+{marketData.listSellRatio.change}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Sale price vs list price</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Demographics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Population</span>
              <span className="font-semibold">{demographicData.population.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Median Age</span>
              <span className="font-semibold">{demographicData.medianAge}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Median Income</span>
              <span className="font-semibold">${demographicData.medianIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Vacancy Rate</span>
              <span className="font-semibold">{demographicData.vacancyRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Renter Households</span>
              <span className="font-semibold">{demographicData.renterHouseholds}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Market Activity</h3>
          <div className="space-y-4">
            {Object.entries(timelineData).map(([period, data]) => (
              <div key={period} className="flex justify-between items-center">
                <span className="text-gray-600">{period.toUpperCase()}</span>
                <div className="text-right">
                  <div className="font-semibold">${data.value.toLocaleString()}</div>
                  <div className={`text-sm ${data.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.change > 0 ? '+' : ''}{data.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog.Root open={showTrendsDialog} onOpenChange={setShowTrendsDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl overflow-auto">
            <Dialog.Title className="text-xl font-semibold mb-6">Market Trends Analysis</Dialog.Title>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                  >
                    <option value="propertyValue">Property Value</option>
                    <option value="salesVolume">Sales Volume</option>
                    <option value="daysOnMarket">Days on Market</option>
                    <option value="listSellRatio">List/Sell Ratio</option>
                  </select>

                  <div className="flex bg-gray-100 rounded-lg p-1">
                    {Object.keys(timelineData).map((period) => (
                      <button
                        key={period}
                        onClick={() => setTimeRange(period)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          timeRange === period
                            ? 'bg-white text-blue-600 shadow'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {period.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Last updated: Today, 9:41 AM</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {Object.entries(timelineData[timeRange]).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className={value > 0 ? 'text-green-600' : 'text-red-600'}>
                          {value > 0 ? '+' : ''}{value}
                          {key.includes('value') ? '%' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-[300px] bg-white rounded-lg p-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Chart visualization would go here
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </button>
            </div>

            <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold mb-6">Market Comparison</Dialog.Title>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                {cityComparison.map((city) => (
                  <div key={city.city} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">{city.city}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Property Value</span>
                        <span className="font-semibold">${city.propertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">YoY Growth</span>
                        <span className="font-semibold">{city.growth}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Occupancy Rate</span>
                        <span className="font-semibold">{city.occupancy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Avg. ROI</span>
                        <span className="font-semibold">{city.roi}%</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{city.insight}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  <p className="text-sm text-blue-800">
                    Data sources: Zillow Home Value Index, U.S. Census, Detroit Future City, Local Market Surveys
                  </p>
                </div>
              </div>
            </div>

            <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}