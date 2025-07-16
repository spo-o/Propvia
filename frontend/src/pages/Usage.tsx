import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { API_BASE_URL_USAGE } from '../config';
import type { AuthState } from '../store/authStore';

interface UsageResponse {
  plan: string;
  usage: { analysis: number; ask: number };
  limits: { analysis: number; ask: number };
  remaining: { analysis: number; ask: number };
}

export default function Usage() {
  const user = useAuthStore((state: AuthState) => state.user);
  const [usageData, setUsageData] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      setError('Please log in.');
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL_USAGE}/by-user/${user.id}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        console.log('✅ Usage fetched:', data);
        setUsageData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error fetching usage:', err);
        setError('Failed to load usage data.');
        setLoading(false);
      });
  }, [user?.id]);

  if (loading) return <div className="p-6">Loading usage data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!usageData) return <div className="p-6">No usage data found.</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Usage</h1>
      <div className="border rounded-lg p-4 shadow space-y-2">
        <p><strong>Plan:</strong> {usageData.plan}</p>

        <div>
          <h2 className="font-semibold mb-1">Usage This Month:</h2>
          <p>Analyses used: {usageData.usage.analysis} / {usageData.limits.analysis}</p>
          <p>Asks used: {usageData.usage.ask} / {usageData.limits.ask}</p>
        </div>

        <div>
          <h2 className="font-semibold mb-1">Remaining:</h2>
          <p>Analyses remaining: {usageData.remaining.analysis}</p>
          <p>Asks remaining: {usageData.remaining.ask}</p>
        </div>
      </div>
    </div>
  );
}
