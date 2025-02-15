import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import TaskList from '../productivity/TaskList';

export default function Dashboard() {
  // Mock data for recent posts - replace with actual API call
  const [recentPosts] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      status: 'published',
      createdAt: '2025-02-15T10:00:00Z',
      excerpt: 'Learn the basics of React and how to build your first component...'
    },
    {
      id: 2,
      title: 'Advanced TypeScript Patterns',
      status: 'draft',
      createdAt: '2025-02-14T15:30:00Z',
      excerpt: 'Explore advanced TypeScript patterns and best practices...'
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your recent activity and upcoming tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Posts Section */}
        <div>
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Posts</h2>
              <Link
                to="/blog/new"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                New Post
              </Link>
            </div>

            <div className="space-y-4">
              {recentPosts.map(post => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link to={`/blog/${post.id}`} className="hover:text-indigo-600">
                        {post.title}
                      </Link>
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {recentPosts.length === 0 && (
                <div className="text-center py-4">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new post.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
