import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import blog posts data
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id.toString() === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Blog post not found</h1>
        <Link to="/blog" className="text-brand hover:text-brand-600">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/blog"
        className="inline-flex items-center text-brand hover:text-brand-600 mb-8"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <img 
        src={post.image} 
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-lg mb-8"
      />

      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{post.readTime}</span>
        </div>
        <div className="flex items-center">
          <User className="w-4 h-4 mr-2" />
          <span>{post.author}</span>
        </div>
      </div>

      <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}