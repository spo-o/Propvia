import React from 'react';
import { useParams } from 'react-router-dom';

export default function PropertyDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Property Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-600">Property ID: {id}</p>
        {/* Placeholder for property details content */}
        <p className="text-gray-500 mt-4">Property details will be displayed here</p>
      </div>
    </div>
  );
}