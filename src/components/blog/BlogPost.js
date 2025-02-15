import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import WritingAssistant from '../writing-assistant/WritingAssistant';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchPost = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPost({
        id,
        title: 'Getting Started with React',
        content: '<h1>Getting Started with React</h1><p>React is a powerful JavaScript library...</p>',
        author: 'John Doe',
        date: '2024-03-15',
        tags: ['React', 'JavaScript', 'Web Development'],
        readingTime: '5 min'
      });
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleTagClick = (tag) => {
    navigate(`/tags?tags=${tag}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <article className="bg-white rounded-lg shadow-sm p-6">
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-gray-600">{post.readingTime} read</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors duration-150"
                  >
                    <TagIcon className="mr-1 h-3 w-3" />
                    {tag}
                  </button>
                ))}
              </div>
            </header>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
        <div className="lg:col-span-1">
          <WritingAssistant content={post.content} />
        </div>
      </div>
    </div>
  );
} 