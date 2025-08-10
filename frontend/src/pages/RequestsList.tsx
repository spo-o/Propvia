import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { API_REPORTS_URL } from '../config';


interface Report {
  id: string;
  report_url: string;
  created_at: string;
}

interface CustomRequest {
  id: string;
  selected_package: string;
  payment_status: string;
  address: string;
  created_at: string;
  reports: Report[];
}

export default function RequestsList() {
  const user = useAuthStore((state) => state.user);
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🪵 useEffect triggered - user:', user);

    if (!user?.email) {
      console.warn('⚠️ No user email found. Stopping fetch.');
      setLoading(false);
      return;
    }

    const url = `${API_REPORTS_URL}/reports/by-user/${encodeURIComponent(user.email)}`;

    console.log('🌐 Fetching custom requests from:', url);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('✅ Fetched custom requests:', data);
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Error fetching custom requests:', err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    console.log('⏳ Loading state active...');
    return <div className="p-6 text-center">Loading your custom requests...</div>;
  }

  if (!user) {
    console.warn('⚠️ User not logged in. Displaying login message.');
    return <div className="p-6 text-center">Please log in to view your custom requests.</div>;
  }

  console.log('🪵 Render - requests:', requests);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Custom Requests</h1>

      {requests.length === 0 && (
        <p className="text-gray-600">You have not submitted any custom requests yet.</p>
      )}

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                {req.selected_package} ({req.payment_status})
              </h2>
              <span className="text-sm text-gray-500">
                {new Date(req.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> {req.address}
            </p>

            {req.reports && req.reports.length > 0 ? (
              <div className="mt-2">
                <h3 className="text-sm font-semibold mb-1">Reports:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {req.reports.map((report) => (
                    <li key={report.id}>
                      <a
                        href={report.report_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Report PDF
                      </a>
                      <span className="text-xs text-gray-400 ml-2">
                        ({new Date(report.created_at).toLocaleDateString()})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No reports available yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
