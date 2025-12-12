import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CommunityCard from '../components/CommunityCard';

const Home = () => {
  const popularStacks = ['React', 'Node.js', 'Python', 'Machine Learning', 'Vue', 'Angular', 'Django', 'Flask'];
  
  const featuredCommunities = [
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
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Navigate to discover page with search query
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Find your dev community.
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Grow together.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-dark dark:text-muted-dark mb-8 max-w-2xl mx-auto">
            Connect with developers who share your tech stack. Discover communities, learn faster, and build amazing things together.
          </p>
          
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Popular Stacks */}
          <div className="mb-12">
            <p className="text-sm text-muted-dark dark:text-muted-dark mb-4">Popular Tech Stacks</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularStacks.map((stack) => (
                <Link
                  key={stack}
                  to={`/discover?stack=${stack}`}
                  className="px-4 py-2 bg-dark-card dark:bg-dark-card border border-dark-border rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:border-primary hover:text-primary transition-all duration-250"
                >
                  {stack}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Featured Communities
            </h2>
            <Link
              to="/discover"
              className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
            >
              <span>View All</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Not sure where to start?
          </h2>
          <p className="text-lg text-muted-dark dark:text-muted-dark mb-8">
            Let our Match Maker find the perfect communities for your skills and goals.
          </p>
          <Link
            to="/match"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Start Matching
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

