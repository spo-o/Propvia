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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/guides"
        className="inline-flex items-center text-brand hover:text-brand-600 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Guides
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
      
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}