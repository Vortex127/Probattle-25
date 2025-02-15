import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './RichTextEditor';
import WritingAssistant from '../writing-assistant/WritingAssistant';

export default function CreatePostForm() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: '',
    status: 'draft',
    visibility: 'public'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // TODO: Implement actual post creation with API
      console.log('Creating post:', {
        ...post,
        tags: post.tags.split(',').map(tag => tag.trim())
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <RichTextEditor
                  content={post.content}
                  onChange={(newContent) => setPost({ ...post, content: newContent })}
                />
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={post.tags}
                  onChange={(e) => setPost({ ...post, tags: e.target.value })}
                  placeholder="technology, programming, web development"
                />
              </div>

              {/* Status and Visibility */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={post.status}
                    onChange={(e) => setPost({ ...post, status: e.target.value })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="visibility" className="block text-sm font-medium text-gray-700">
                    Visibility
                  </label>
                  <select
                    id="visibility"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={post.visibility}
                    onChange={(e) => setPost({ ...post, visibility: e.target.value })}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Writing Assistant Sidebar */}
        <div className="lg:col-span-1">
          <WritingAssistant content={post.content} />
        </div>
      </div>
    </div>
  );
}
