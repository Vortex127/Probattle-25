import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  PencilSquareIcon, 
  CheckCircleIcon, 
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  const { user } = useAuth();
  
  // Mock featured blogs data - replace with API call
  const featuredBlogs = [
    {
      id: 1,
      title: "Getting Started with React Development",
      excerpt: "Learn the fundamentals of React and start building modern web applications...",
      author: "John Doe",
      readTime: "5 min"
    },
    {
      id: 2,
      title: "Productivity Tips for Developers",
      excerpt: "Boost your productivity with these essential tips and tools...",
      author: "Jane Smith",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "Writing Clean Code",
      excerpt: "Best practices for writing maintainable and scalable code...",
      author: "Mike Johnson",
      readTime: "6 min"
    }
  ];

  const features = [
    {
      name: 'Content Creation',
      description: 'Write and manage your blog posts with our powerful editor',
      icon: PencilSquareIcon,
    },
    {
      name: 'Task Management',
      description: 'Stay organized with integrated task tracking and reminders',
      icon: CheckCircleIcon,
    },
    {
      name: 'AI Assistant',
      description: 'Get intelligent writing suggestions and content optimization',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      name: 'Advanced Search',
      description: 'Find content quickly with our powerful search capabilities',
      icon: MagnifyingGlassIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Blog Smarter, Work Better
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Combine powerful blogging capabilities with productivity tools. Create content, stay organized, and boost your productivity all in one place.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go to Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/register"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Get Started
                      </Link>
                      <Link
                        to="/login"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Sign In <span aria-hidden="true">→</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All-in-One Platform
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Streamline your content creation and task management with our comprehensive suite of tools.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Featured Blogs Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Posts</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Discover our latest and most popular content
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredBlogs.map((post) => (
              <article key={post.id} className="flex flex-col items-start">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post.author}
                    </p>
                    <p className="text-gray-600">{post.readTime} read</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 