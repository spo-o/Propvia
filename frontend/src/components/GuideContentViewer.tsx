import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GuideContentViewerProps {
  title: string;
  content: string;
}

export default function GuideContentViewer({ title, content }: GuideContentViewerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand to-brand-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link 
            to="/guides"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to All Guides</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
          <div className="prose prose-lg prose-brand max-w-none 
                         prose-headings:text-gray-900 prose-headings:font-bold
                         prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0
                         prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:text-brand
                         prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8
                         prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                         prose-li:text-gray-700 prose-li:mb-2
                         prose-strong:text-gray-900 prose-strong:font-semibold
                         prose-ul:mb-8 prose-ol:mb-8
                         prose-li:marker:text-brand">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>

        {/* Navigation/CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-brand to-brand-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Apply What You've Learned?</h3>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Put your knowledge into practice with our powerful property analysis tools and start making data-driven investment decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/property-search"
              className="inline-flex items-center px-6 py-3 bg-accent text-brand rounded-xl hover:bg-accent-dark transition-all duration-300 font-semibold"
            >
              Start Property Analysis
            </Link>
            <Link
              to="/guides"
              className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold border border-white/20"
            >
              Explore More Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}