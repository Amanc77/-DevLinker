import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CommunityCard from '../components/CommunityCard';

const Discover = () => {
  const [filters, setFilters] = useState({
    stack: '',
    level: '',
    mode: '',
    language: '',
  });

  const communities = [
    {
      id: 1,
      name: 'React Developers',
      description: 'A vibrant community of React developers sharing knowledge, best practices, and helping each other grow.',
      members: '12.5k',
      tags: ['React', 'JavaScript', 'Frontend'],
      matchScore: 95,
    },
    {
      id: 2,
      name: 'Node.js Enthusiasts',
      description: 'Connect with Node.js developers worldwide. Share projects, get help, and learn together.',
      members: '8.3k',
      tags: ['Node.js', 'Backend', 'JavaScript'],
      matchScore: 88,
    },
    {
      id: 3,
      name: 'Python Learners',
      description: 'Perfect for beginners and experts alike. Learn Python, share code, and build amazing projects.',
      members: '15.2k',
      tags: ['Python', 'Programming', 'Learning'],
      matchScore: 92,
    },
    {
      id: 4,
      name: 'Vue.js Community',
      description: 'The progressive JavaScript framework. Join us to discuss Vue, Nuxt, and modern frontend development.',
      members: '6.7k',
      tags: ['Vue', 'JavaScript', 'Frontend'],
      matchScore: 85,
    },
    {
      id: 5,
      name: 'Machine Learning Hub',
      description: 'Explore AI and ML with fellow enthusiasts. Share research, projects, and learn from experts.',
      members: '9.1k',
      tags: ['ML', 'AI', 'Data Science'],
      matchScore: 90,
    },
    {
      id: 6,
      name: 'Full Stack Developers',
      description: 'For developers who love both frontend and backend. Share full-stack projects and experiences.',
      members: '11.3k',
      tags: ['Full Stack', 'Web Development'],
      matchScore: 87,
    },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      stack: '',
      level: '',
      mode: '',
      language: '',
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Communities
          </h1>
          <p className="text-muted-dark dark:text-muted-dark">
            Find the perfect community for your tech stack and interests
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={(query) => console.log('Search:', query)} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-dark-card dark:bg-dark-card border border-dark-border rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-6">
                {/* Tech Stack */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Tech Stack
                  </label>
                  <select
                    value={filters.stack}
                    onChange={(e) => handleFilterChange('stack', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Stacks</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                    <option value="python">Python</option>
                    <option value="vue">Vue.js</option>
                    <option value="angular">Angular</option>
                  </select>
                </div>

                {/* Learning Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Learning Level
                  </label>
                  <select
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Mode
                  </label>
                  <select
                    value={filters.mode}
                    onChange={(e) => handleFilterChange('mode', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Modes</option>
                    <option value="online">Online</option>
                    <option value="local">Local</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-dark-border rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Languages</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Community Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-dark dark:text-muted-dark">
                {communities.length} communities found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Discover;

