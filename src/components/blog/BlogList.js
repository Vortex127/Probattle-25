import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';

export default function BlogList() {
  // Mock data - replace with API call
  const [posts] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      excerpt: 'Learn the fundamentals of React and start building modern web applications...',
      author: 'John Doe',
      date: '2024-03-15',
      tags: ['React', 'JavaScript', 'Web Development'],
      readingTime: '5 min',
      status: 'published'
    },
    // ... more posts
  ]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Blog Posts</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="/blog/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Create Post
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
              <div className="flex-1">
                <Link to={`/blog/${post.id}`} className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                  <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      <TagIcon className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <span className="sr-only">{post.author}</span>
                  <UserIcon className="h-10 w-10 text-gray-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{post.author}</p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <span>{post.readingTime} read</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>
                      <CalendarIcon className="inline h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 