import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, FileText, BarChart, Settings, Download, Edit, Trash2, Plus } from 'lucide-react';
import { useToastStore } from '../store/toastStore';
import { useAuthStore } from '../store/authStore';
import { getAdminRole } from '../api/auth';
import { fetchSubscribers } from '../api/subscribers';
import { fetchUsers } from '../api/users';
import { fetchNewsletters } from '../api/newsletters';
import { fetchBlogs, generateBlog, createBlog, publishBlog, deleteBlog, updateBlog } from '../api/blogs';
import * as Dialog from '@radix-ui/react-dialog';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('subscribers');
  const [subscribers, setSubscribers] = useState([]);
  const [users, setUsers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [generatingBlog, setGeneratingBlog] = useState(false);

const { token } = useAuthStore();
const showToast = useToastStore(state => state.showToast);
const navigate = useNavigate();

useEffect(() => {
  checkAdminAccess();
  fetchData();

  console.log("Token from Zustand store:", token);
}, []);


  const checkAdminAccess = async () => {
    try {
      const res = await getAdminRole(token);
      if (res.role !== 'admin') {
        navigate('/');
        showToast('Unauthorized access', 'error');
      }
    } catch {
      navigate('/login');
      showToast('Unauthorized access', 'error');
    }
  };

  const fetchData = async () => {
    try {
      const [subs, usersData, newslettersData, blogsData] = await Promise.all([
        fetchSubscribers(token),
        fetchUsers(token),
        fetchNewsletters(token),
        fetchBlogs(token)
      ]);
      setSubscribers(subs);
      setUsers(usersData);
      setNewsletters(newslettersData);
      setBlogs(blogsData);
    } catch {
      showToast('Error fetching data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const generateBlogContent = async () => {
    if (!blogTitle) {
      showToast('Please enter a blog title', 'error');
      return;
    }

    setGeneratingBlog(true);
    try {
      const result = await generateBlog(token, blogTitle);
      setBlogContent(result.content);
    } catch {
      showToast('Error generating blog content', 'error');
    } finally {
      setGeneratingBlog(false);
    }
  };

  const saveBlog = async () => {
    if (!blogTitle || !blogContent) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      const newBlog = await createBlog(token, {
        title: blogTitle,
        content: blogContent
      });
      setBlogs([newBlog, ...blogs]);
      setShowBlogDialog(false);
      setBlogTitle('');
      setBlogContent('');
      showToast('Blog post saved successfully', 'success');
    } catch {
      showToast('Error saving blog post', 'error');
    }
  };

  const handlePublish = async (id: string) => {
  try {
    const updated = await publishBlog(token, id);
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === id ? updated : blog))
    );
    showToast('Blog published successfully', 'success');
  } catch {
    showToast('Error publishing blog', 'error');
  }
};

const handleDelete = async (id: string) => {
  try {
    await deleteBlog(token, id);
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    showToast('Blog deleted', 'success');
  } catch {
    showToast('Error deleting blog', 'error');
  }
};

const handleUpdate = async (id: string, updatedData: { title?: string; content?: string }) => {
  try {
    const updated = await updateBlog(token, id, updatedData);
    setBlogs((prev) =>
      prev.map((blog) => (blog.id === id ? updated : blog))
    );
    showToast('Blog updated', 'success');
  } catch {
    showToast('Error updating blog', 'error');
  }
};

  const exportSubscribers = () => {
    const csv = subscribers.map(s => `${s.email},${s.created_at}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          <Settings className="w-6 h-6 text-gray-500" />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('subscribers')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'subscribers'
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Subscribers
              </button>
              <button
                onClick={() => setActiveTab('newsletters')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'newsletters'
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Newsletters
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'blogs'
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="w-5 h-5 inline mr-2" />
                Blog Posts
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'analytics'
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart className="w-5 h-5 inline mr-2" />
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'subscribers' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Email Subscribers</h2>
                  <button
                    onClick={exportSubscribers}
                    className="flex items-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subscribed Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subscriber.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(subscriber.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'newsletters' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Newsletter History</h2>
                  <button className="flex items-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Newsletter
                  </button>
                </div>
                <div className="space-y-4">
                  {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{newsletter.subject}</h3>
                          <p className="text-sm text-gray-500">
                            Sent on {new Date(newsletter.sent_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">
                            {newsletter.open_rate}% open rate
                          </span>
                          <button className="text-brand hover:text-brand-600">
                            View Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'blogs' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Blog Posts</h2>
                  <button
                    onClick={() => setShowBlogDialog(true)}
                    className="flex items-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Blog Post
                  </button>
                </div>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                  <div key={blog.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{blog.title}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(blog.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-green-500 hover:text-green-700"
                          onClick={() => handlePublish(blog.id)}
                          title="Publish"
                        >
                          ⬆️
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-gray-600"
                          onClick={() => {
                            setBlogTitle(blog.title);
                            setBlogContent(blog.content);
                            setShowBlogDialog(true);
                            setEditingBlogId(blog.id); // Optional: track which blog is being edited
                          }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-400 hover:text-red-600"
                          onClick={() => handleDelete(blog.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{users.length}</p>
                    <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-500">Active Subscribers</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{subscribers.length}</p>
                    <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-sm font-medium text-gray-500">Avg. Open Rate</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">42%</p>
                    <p className="text-sm text-green-600 mt-1">+5% from last month</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog.Root open={showBlogDialog} onOpenChange={setShowBlogDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[800px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl overflow-auto">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Create New Blog Post
            </Dialog.Title>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Title
                </label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Content
                  </label>
                  <button
                    onClick={generateBlogContent}
                    disabled={generatingBlog || !blogTitle}
                    className="text-sm text-brand hover:text-brand-600 disabled:opacity-50"
                  >
                    {generatingBlog ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={10}
                  placeholder="Enter blog content"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBlogDialog(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={saveBlog}
                  className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-600"
                >
                  Save Blog Post
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

