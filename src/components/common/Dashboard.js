import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PencilIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import TaskList from '../productivity/TaskList';

export default function Dashboard() {
  const navigate = useNavigate();
  // Mock data for recent posts - replace with actual API call
  const [recentPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      status: 'published',
      createdAt: '2025-02-15T10:00:00Z',
      excerpt: 'Learn the basics of React and how to build your first component...',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      status: 'draft',
      createdAt: '2025-02-14T15:30:00Z',
      excerpt: 'Explore advanced TypeScript patterns and best practices...',
      coverImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Welcome Section with Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="mt-2 text-indigo-100">
          Here's an overview of your recent activity and upcoming tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts Section */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Posts</h2>
                <Link
                  to="/blog/new"
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-150"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  New Post
                </Link>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {recentPosts.map(post => (
                <div 
                  key={post.id} 
                  className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="flex items-start space-x-4">
                    {post.coverImage && (
                      <div className="flex-shrink-0">
                        <img 
                          src={post.coverImage} 
                          alt="" 
                          className="h-20 w-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 truncate">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Section with Enhanced Design */}
        <div>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
