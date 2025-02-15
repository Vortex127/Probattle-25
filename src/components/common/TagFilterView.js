import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function TagFilterView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState(searchParams.get('tags')?.split(',') || []);
  const [filteredContent, setFilteredContent] = useState({
    posts: [],
    notes: [],
    tasks: []
  });
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  // Mock data - replace with API calls
  useEffect(() => {
    // Simulate API call to fetch content filtered by tags
    const fetchFilteredContent = async () => {
      // This would be an API call in production
      const mockData = {
        posts: [
          {
            id: 1,
            title: 'React Hooks Guide',
            excerpt: 'Learn about React Hooks...',
            tags: ['React', 'JavaScript', 'Web Development'],
            type: 'post'
          },
          // ... more posts
        ],
        notes: [
          {
            id: 1,
            title: 'TypeScript Notes',
            content: 'TypeScript best practices...',
            tags: ['TypeScript', 'JavaScript'],
            type: 'note'
          },
          // ... more notes
        ],
        tasks: [
          {
            id: 1,
            title: 'Update Documentation',
            status: 'pending',
            tags: ['Documentation', 'Web Development'],
            type: 'task'
          },
          // ... more tasks
        ]
      };

      // Filter content based on active tags
      const filtered = {
        posts: mockData.posts.filter(post => 
          activeFilters.some(tag => post.tags.includes(tag))),
        notes: mockData.notes.filter(note => 
          activeFilters.some(tag => note.tags.includes(tag))),
        tasks: mockData.tasks.filter(task => 
          activeFilters.some(tag => task.tags.includes(tag)))
      };

      setFilteredContent(filtered);

      // Get suggested tags (related to current filters)
      const allTags = new Set();
      [...filtered.posts, ...filtered.notes, ...filtered.tasks].forEach(item => {
        item.tags.forEach(tag => allTags.add(tag));
      });
      setSuggestedTags(Array.from(allTags).filter(tag => !activeFilters.includes(tag)));
    };

    if (activeFilters.length > 0) {
      fetchFilteredContent();
      // Update URL with current filters
      setSearchParams({ tags: activeFilters.join(',') });
    }
  }, [activeFilters, setSearchParams]);

  const addFilter = (tag) => {
    if (!activeFilters.includes(tag)) {
      setActiveFilters([...activeFilters, tag]);
    }
  };

  const removeFilter = (tag) => {
    setActiveFilters(activeFilters.filter(t => t !== tag));
  };

  const handleAddNewTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !activeFilters.includes(newTag.trim())) {
      addFilter(newTag.trim());
      setNewTag('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Active Filters */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Active Filters</h2>
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeFilter(tag)}
                className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
          <form onSubmit={handleAddNewTag} className="inline-flex items-center">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag..."
              className="px-3 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Suggested Tags */}
      {suggestedTags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested tags</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map(tag => (
              <button
                key={tag}
                onClick={() => addFilter(tag)}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                <PlusIcon className="h-3 w-3 mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Content */}
      <div className="space-y-8">
        {/* Posts */}
        {filteredContent.posts.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContent.posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{post.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {filteredContent.notes.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContent.notes.map(note => (
                <Link
                  key={note.id}
                  to={`/notes/${note.id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{note.content}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {note.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tasks */}
        {filteredContent.tasks.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tasks</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredContent.tasks.map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {task.status}
                  </span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 