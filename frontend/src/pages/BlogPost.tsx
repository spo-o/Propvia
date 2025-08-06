import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import blog posts data
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id.toString() === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowLeft className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-6 py-3 bg-brand text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        </div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Link 
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md text-white font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 pb-16 w-full">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/90 text-brand-900 font-medium backdrop-blur-sm"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Article Header Info */}
          <div className="px-8 md:px-12 pt-12 pb-8 border-b border-gray-100">
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {post.excerpt}
            </p>
            
            {/* Share Buttons */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-500">Share this article:</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank')}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="p-2 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="px-8 md:px-12 py-12">
            <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-brand prose-a:no-underline hover:prose-a:text-brand-600 prose-blockquote:border-brand prose-blockquote:bg-brand/5 prose-blockquote:text-gray-700">
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 mt-6">{children}</h3>,
                  p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4 text-lg">{children}</p>,
                  ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
                  li: ({children}) => <li className="text-gray-700 leading-relaxed">{children}</li>,
                  strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-brand bg-brand/5 pl-6 py-4 my-6 italic text-gray-700">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </div>
        </div>

        {/* Related Articles or CTA */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-brand via-brand-600 to-brand-700 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Property Journey?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Get expert analysis and insights for your next Detroit property investment with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/properties"
                  className="px-8 py-4 bg-accent text-brand-900 font-bold rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Explore Properties
                </Link>
                <Link 
                  to="/blog"
                  className="px-8 py-4 bg-white/20 text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}