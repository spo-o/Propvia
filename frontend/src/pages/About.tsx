import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Propvia Testing</h1>
      
      <div className="prose prose-lg">
        <p className="text-xl text-gray-600 mb-8">
          Propvia is revolutionizing commercial property analysis through advanced AI and data analytics, 
          helping businesses make smarter real estate decisions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-8">
          To empower businesses with data-driven insights and AI-powered analytics, making commercial 
          property decisions more transparent, efficient, and profitable.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Vision</h2>
        <p className="text-gray-600 mb-8">
          To become the global standard for commercial property analysis, helping businesses worldwide 
          unlock the full potential of their real estate investments.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-brand mb-3">Innovation</h3>
            <p className="text-gray-600">
              Continuously pushing boundaries with cutting-edge technology and AI solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-brand mb-3">Transparency</h3>
            <p className="text-gray-600">
              Providing clear, actionable insights backed by reliable data.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-brand mb-3">Excellence</h3>
            <p className="text-gray-600">
              Delivering the highest quality analysis and customer service.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-brand mb-3">Integrity</h3>
            <p className="text-gray-600">
              Building trust through honest, ethical business practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}