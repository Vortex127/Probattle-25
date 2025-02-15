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
    visibility: 'public',
    coverImage: null
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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
              <p className="mt-1 text-sm text-gray-500">
                Share your thoughts with the world
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
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
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Writing Assistant Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <WritingAssistant content={post.content} />
          
          {/* SEO Preview */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Preview</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Title Preview</h4>
                <p className="mt-1 text-sm text-blue-600 hover:underline">
                  {post.title || 'Your Post Title'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">URL Preview</h4>
                <p className="mt-1 text-sm text-green-600">
                  {`yourdomain.com/blog/${post.title?.toLowerCase().replace(/\s+/g, '-') || 'post-url'}`}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Meta Description</h4>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                  {post.content?.replace(/<[^>]*>/g, '').slice(0, 160) || 'Your post description will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
